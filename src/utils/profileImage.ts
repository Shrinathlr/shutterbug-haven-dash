
import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a profile image to Supabase Storage and returns the public URL
 */
export async function uploadProfileImage(file: File, userId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}_${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;
  const { error } = await supabase.storage.from("profile-images").upload(filePath, file, {
    upsert: true,
  });
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
  return data.publicUrl || null;
}

/**
 * Deletes a profile image from Supabase Storage (based on the full public URL)
 */
export async function deleteProfileImage(profileImageUrl: string) {
  // Get the path after the Storage bucket
  const url = new URL(profileImageUrl);
  const pathMatch = /profile-images\/(.*)/.exec(url.pathname);
  if (!pathMatch) return;
  const [, filePath] = pathMatch;
  await supabase.storage.from("profile-images").remove([filePath]);
}
