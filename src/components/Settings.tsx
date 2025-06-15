import { useState, useEffect } from "react";
import { User, Bell, CreditCard, Shield, Camera, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { uploadProfileImage, deleteProfileImage } from "@/utils/profileImage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  // Fetch current logged-in user
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data?.user) setSessionUserId(data.user.id);
    });
    // Subscribe to session (for login/logout)
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session && mounted) setSessionUserId(session.user.id);
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

  const [editingData, setEditingData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [imageUploading, setImageUploading] = useState(false);

  // Initialize form state on profile load
  useEffect(() => {
    if (profile) {
      setEditingData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    }
  }, [profile?.user_id]);

  // Notifications - keep as local state for demo
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    newMessages: true,
    photoDelivery: true,
    promotions: false,
  });

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !sessionUserId) return;
    setImageUploading(true);
    toast({ title: "Uploading image...", description: "Please wait." });
    try {
      const url = await uploadProfileImage(e.target.files[0], sessionUserId);
      await saveProfile({ profile_image_url: url });
      toast({ title: "Profile image updated!" });
      await refetch();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    }
    setImageUploading(false);
  };

  // Handle image delete
  const handleDeleteImage = async () => {
    if (!profile?.profile_image_url) return;
    setImageUploading(true);
    toast({ title: "Deleting image..." });
    try {
      await deleteProfileImage(profile.profile_image_url);
      await saveProfile({ profile_image_url: null });
      toast({ title: "Profile image removed." });
      await refetch();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
    setImageUploading(false);
  };

  // Save profile info to Supabase
  const handleProfileSave = async () => {
    await saveProfile({ ...editingData });
    toast({ title: "Profile updated!" });
    await refetch();
  };

  // Profile loading state or error
  if (!sessionUserId) {
    return <div className="p-8 text-center text-muted-foreground">Please sign in to manage your settings.</div>;
  }
  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading profile...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-destructive">Something went wrong: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      {/* Profile Settings */}
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
              <AvatarImage src={profile?.profile_image_url ?? "/api/placeholder/80/80"} />
              <AvatarFallback>
                {profile?.name
                  ? profile.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()
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

      {/* Notification Settings */}
      <Card className="glassmorphism animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-green-400" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="booking-updates" className="font-medium">Booking Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about booking confirmations and changes</p>
              </div>
              <Switch
                id="booking-updates"
                checked={notifications.bookingUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, bookingUpdates: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-messages" className="font-medium">New Messages</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new chat messages</p>
              </div>
              <Switch
                id="new-messages"
                checked={notifications.newMessages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newMessages: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="photo-delivery" className="font-medium">Photo Delivery</Label>
                <p className="text-sm text-muted-foreground">Get notified when your photos are ready</p>
              </div>
              <Switch
                id="photo-delivery"
                checked={notifications.photoDelivery}
                onCheckedChange={(checked) => setNotifications({ ...notifications, photoDelivery: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="font-medium">Promotions & Updates</Label>
                <p className="text-sm text-muted-foreground">Receive marketing emails and promotional offers</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-green-400" />
              <span>Payment Methods</span>
            </CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-green-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs flex items-center justify-center">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-green-400/30">
                Edit
              </Button>
            </div>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Enable Two-Factor Auth
            </Button>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Download Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
