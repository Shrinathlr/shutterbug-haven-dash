
-- 1. Create a new `user_profiles` table to store profile info and a profile image for each user.
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text,
  email text,
  phone text,
  location text,
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable row-level security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Insert policies so each user can manage ONLY their own row
CREATE POLICY "User can select own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User can delete own profile" ON public.user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- 4. Create a public storage bucket for profile images (name: profile-images)
insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true);

-- 5. (Optional!) Grant full public access to profile-images bucket (customize later if needed)
-- This makes it simple for early development - can be restricted later.
