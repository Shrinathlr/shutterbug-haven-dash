
import { useState } from "react";
import { Calendar, Clock, MapPin, Star, Eye, MessageCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BookingHistory() {
  const [activeTab, setActiveTab] = useState("all");

  // All stats zero
  const bookings: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-400/20 text-green-400";
      case "completed":
        return "bg-blue-400/20 text-blue-400";
      case "pending":
        return "bg-yellow-400/20 text-yellow-400";
      case "cancelled":
        return "bg-red-400/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") return booking.upcoming;
    if (activeTab === "completed") return booking.status === "completed";
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">Booking History</h1>
        <p className="text-muted-foreground">Track all your photography sessions and appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">0</div>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">0</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">0</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">$0</div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-400 data-[state=active]:text-black">
            All Bookings
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-400 data-[state=active]:text-black">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-green-400 data-[state=active]:text-black">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {/* Show empty state */}
            <Card className="glassmorphism animate-fade-in">
              <CardContent className="p-10 text-center text-muted-foreground">
                No bookings to display yet.
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
// NOTE: This file is growing. You may want to refactor it into smaller components for maintainability.
