
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id?: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profile_image_url: string | null;
}

export function useUserProfile(sessionUserId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile on mount or when user changes
  useEffect(() => {
    if (!sessionUserId) return;
    setLoading(true);
    supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", sessionUserId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProfile(data || null);
        setLoading(false);
      });
  }, [sessionUserId]);

  // Upsert profile
  const saveProfile = async (data: Partial<UserProfile>) => {
    if (!sessionUserId) return;
    setLoading(true);
    setError(null);
    const upsertData = {
      ...profile,
      ...data,
      user_id: sessionUserId, // always use session user ID!
      updated_at: new Date().toISOString(),
    };
    const { data: updated, error } = await supabase
      .from("user_profiles")
      .upsert(upsertData)
      .select()
      .maybeSingle();
    if (error) setError(error.message);
    setProfile(updated || null);
    setLoading(false);
    return { data: updated, error };
  };

  return {
    profile,
    loading,
    error,
    saveProfile,
    setProfile,
    refetch: async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", sessionUserId)
        .maybeSingle();
      if (error) setError(error.message);
      else setProfile(data || null);
      setLoading(false);
    },
  };
}
