
import { useState } from "react";
import { Calendar, Clock, MapPin, Star, Eye, MessageCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BookingHistory() {
  const [activeTab, setActiveTab] = useState("all");

  const bookings = [
    {
      id: 1,
      photographer: "Sarah Johnson",
      service: "Wedding Photography",
      date: "2024-12-15",
      time: "10:00 AM - 6:00 PM",
      location: "Central Park, New York",
      status: "confirmed",
      price: "$800",
      rating: 5,
      photos: 45,
      avatar: "/api/placeholder/40/40",
      upcoming: true,
    },
    {
      id: 2,
      photographer: "Mike Chen",
      service: "Portrait Session",
      date: "2024-11-20",
      time: "2:00 PM - 4:00 PM",
      location: "Studio Downtown",
      status: "completed",
      price: "$200",
      rating: 0,
      photos: 18,
      avatar: "/api/placeholder/40/40",
      upcoming: false,
    },
    {
      id: 3,
      photographer: "Emma Wilson",
      service: "Event Photography",
      date: "2024-11-15",
      time: "6:00 PM - 11:00 PM",
      location: "Grand Hotel Ballroom",
      status: "completed",
      price: "$450",
      rating: 5,
      photos: 32,
      avatar: "/api/placeholder/40/40",
      upcoming: false,
    },
    {
      id: 4,
      photographer: "David Martinez",
      service: "Corporate Headshots",
      date: "2024-12-22",
      time: "9:00 AM - 12:00 PM",
      location: "Corporate Office",
      status: "pending",
      price: "$300",
      rating: 0,
      photos: 0,
      avatar: "/api/placeholder/40/40",
      upcoming: true,
    },
  ];

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
            <div className="text-2xl font-bold text-green-400">24</div>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">18</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">4</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">$2,450</div>
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
            {filteredBookings.map((booking, index) => (
              <Card key={booking.id} className="glassmorphism hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.avatar}
                        alt={booking.photographer}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{booking.service}</h3>
                        <p className="text-green-400">{booking.photographer}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-green-400 text-lg">{booking.price}</div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      {booking.status === "completed" && (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(booking.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">{booking.photos} photos</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-green-400/30 hover:bg-green-400/10">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-400/30 hover:bg-green-400/10">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        {booking.status === "completed" && booking.photos > 0 && (
                          <Button size="sm" className="photography-gradient hover:opacity-90">
                            <Download className="h-4 w-4 mr-1" />
                            Photos
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
