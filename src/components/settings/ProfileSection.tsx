
import { useState, useEffect } from "react";
import { User, Camera, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { uploadProfileImage, deleteProfileImage } from "@/utils/profileImage";

interface ProfileSectionProps {
  profile: any;
  loading: boolean;
  saveProfile: (data: any) => Promise<any>;
  refetch: () => Promise<void>;
  sessionUserId: string | null;
}

export function ProfileSection({ profile, loading, saveProfile, refetch, sessionUserId }: ProfileSectionProps) {
  const { toast } = useToast();

  const [editingData, setEditingData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [imageCacheBuster, setImageCacheBuster] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setEditingData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
      setImageCacheBuster("");
    }
  }, [profile?.user_id]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !sessionUserId) return;
    setImageUploading(true);
    toast({ title: "Uploading image...", description: "Please wait." });
    try {
      const url = await uploadProfileImage(e.target.files[0], sessionUserId);
      await saveProfile({ profile_image_url: url });
      toast({ title: "Profile image updated!" });
      await refetch();
      setImageCacheBuster(`?t=${Date.now()}`);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    }
    setImageUploading(false);
  };

  const handleDeleteImage = async () => {
    if (!profile?.profile_image_url) return;
    setImageUploading(true);
    toast({ title: "Deleting image..." });
    try {
      await deleteProfileImage(profile.profile_image_url);
      await saveProfile({ profile_image_url: null });
      toast({ title: "Profile image removed." });
      await refetch();
      setImageCacheBuster(`?t=${Date.now()}`);
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
    setImageUploading(false);
  };

  const handleProfileSave = async () => {
    await saveProfile({ ...editingData });
    toast({ title: "Profile updated!" });
    await refetch();
  };

  return (
    <Card className="glassmorphism animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-green-400" />
          <span>Profile Information</span>
        </CardTitle>
        <CardDescription>Update your personal information and profile picture</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile?.profile_image_url ? profile.profile_image_url + imageCacheBuster : "/api/placeholder/80/80"} />
            <AvatarFallback>
              {profile?.name
                ? profile.name.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()
                : "JD"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={imageUploading}
                onChange={handleImageChange}
              />
              <Button
                variant="outline"
                className="border-green-400/30 hover:bg-green-400/10"
                asChild={false}
                disabled={imageUploading}
              >
                <span className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  {imageUploading ? "Uploading..." : "Change Photo"}
                </span>
              </Button>
            </label>
            {profile?.profile_image_url && (
              <Button
                variant="outline"
                className="border-green-400/30"
                disabled={imageUploading}
                onClick={handleDeleteImage}
              >Delete Photo</Button>
            )}
            <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Full Name</span>
            </Label>
            <Input
              id="name"
              value={editingData.name}
              onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
              className="bg-background border-green-400/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={editingData.email}
              onChange={(e) => setEditingData({ ...editingData, email: e.target.value })}
              className="bg-background border-green-400/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              value={editingData.phone}
              onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })}
              className="bg-background border-green-400/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Label>
            <Input
              id="location"
              value={editingData.location}
              onChange={(e) => setEditingData({ ...editingData, location: e.target.value })}
              className="bg-background border-green-400/30"
            />
          </div>
        </div>

        <Button
          className="photography-gradient hover:opacity-90"
          disabled={loading || imageUploading}
          onClick={handleProfileSave}
        >
          {loading ? "Saving..." : "Save Profile Changes"}
        </Button>
      </CardContent>
    </Card>
  );
}

