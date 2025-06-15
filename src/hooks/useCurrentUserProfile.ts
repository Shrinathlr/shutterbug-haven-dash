
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";

// This hook will get the *current* user's profile (not a passed ID)
export function useCurrentUserProfile() {
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data?.user) setSessionUserId(data.user.id);
    });
    // Listen for auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session && mounted) setSessionUserId(session.user.id);
      if (!session && mounted) setSessionUserId(null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Now use the main profile hook (handles fetching/updating)
  const profileHook = useUserProfile(sessionUserId || undefined);

  return profileHook;
}
