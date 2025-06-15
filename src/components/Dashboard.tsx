import { Calendar, Camera, DollarSign, Star, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";

export function Dashboard() {
  const { profile, loading } = useCurrentUserProfile();

  const stats = [
    {
      title: "Total Bookings",
      value: "0",
      change: "+0%",
      icon: Calendar,
      color: "text-green-400",
    },
    {
      title: "Photos Delivered",
      value: "0",
      change: "+0%",
      icon: Camera,
      color: "text-blue-400",
    },
    {
      title: "Total Spent",
      value: "$0",
      change: "+0%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Avg Rating",
      value: "0",
      change: "+0",
      icon: Star,
      color: "text-yellow-400",
    },
  ];

  // Empty recent bookings
  const recentBookings: any[] = [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {loading
            ? "Welcome back..."
            : `Welcome back, ${profile?.name ? profile.name : "User"}!`}
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your photography bookings.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="glassmorphism hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="glassmorphism animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-400" />
              <span>Recent Bookings</span>
            </CardTitle>
            <CardDescription>Your latest photography sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">No recent bookings yet.</div>
            ) : null}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glassmorphism animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-400" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full photography-gradient hover:opacity-90 transition-opacity">
              Book New Session
            </Button>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Browse Photographers
            </Button>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              View Messages
            </Button>
            <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
              Download Photos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
