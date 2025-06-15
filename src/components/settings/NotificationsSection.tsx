
import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    newMessages: true,
    photoDelivery: true,
    promotions: false,
  });

  return (
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
  );
}
