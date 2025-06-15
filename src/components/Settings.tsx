
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import { ProfileSection } from "./settings/ProfileSection";
import { NotificationsSection } from "./settings/NotificationsSection";
import { PaymentMethodsSection } from "./settings/PaymentMethodsSection";
import { SecuritySection } from "./settings/SecuritySection";

// The reorganized Settings
export function Settings() {
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data?.user) setSessionUserId(data.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session && mounted) setSessionUserId(session.user.id);
      if (!session && mounted) setSessionUserId(null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const {
    profile,
    loading,
    error,
    saveProfile,
    setProfile,
    refetch,
  } = useUserProfile(sessionUserId || undefined);

  if (!sessionUserId) {
    return <div className="p-8 text-center text-muted-foreground">Please sign in to manage your settings.</div>;
  }
  if (loading && !profile) {
    return <div className="p-8 text-center text-muted-foreground">Loading profile...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-destructive">Something went wrong: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <ProfileSection
        profile={profile}
        loading={loading}
        saveProfile={saveProfile}
        refetch={refetch}
        sessionUserId={sessionUserId}
      />
      <NotificationsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodsSection />
        <SecuritySection />
      </div>
    </div>
  );
}
