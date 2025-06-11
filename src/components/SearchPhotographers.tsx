
import { useState } from "react";
import { Search, MapPin, Filter, Star, Heart, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function SearchPhotographers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Wedding Photography",
      location: "New York, NY",
      rating: 4.9,
      reviews: 127,
      price: "$150/hour",
      image: "/api/placeholder/300/300",
      badges: ["Top Rated", "Quick Response"],
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Portrait Photography",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 89,
      price: "$120/hour",
      image: "/api/placeholder/300/300",
      badges: ["New", "Same Day"],
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
    },
    {
      id: 3,
      name: "Emma Wilson",
      specialty: "Event Photography",
      location: "Chicago, IL",
      rating: 4.9,
      reviews: 156,
      price: "$200/hour",
      image: "/api/placeholder/300/300",
      badges: ["Pro", "Verified"],
      portfolio: ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"],
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "wedding", label: "Wedding" },
    { id: "portrait", label: "Portrait" },
    { id: "event", label: "Event" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Photographers</h1>
        <p className="text-muted-foreground">Discover talented photographers in your area</p>
      </div>

      {/* Search and Filters */}
      <Card className="glassmorphism animate-fade-in">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-green-400/30"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-400" />
              <Input placeholder="Location" className="w-32 bg-background border-green-400/30" />
            </div>
            <Button variant="outline" className="border-green-400/30 hover:bg-green-400/10">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "photography-gradient" : "border-green-400/30 hover:bg-green-400/10"}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photographers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photographers.map((photographer, index) => (
          <Card key={photographer.id} className="glassmorphism hover-scale overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="relative">
              <img
                src={photographer.image}
                alt={photographer.name}
                className="w-full h-48 object-cover"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-3 left-3 flex space-x-1">
                {photographer.badges.map((badge) => (
                  <Badge key={badge} className="bg-green-400/90 text-black text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{photographer.name}</h3>
                  <p className="text-green-400 text-sm">{photographer.specialty}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{photographer.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-foreground">{photographer.rating}</span>
                    <span className="text-sm text-muted-foreground">({photographer.reviews})</span>
                  </div>
                  <span className="font-semibold text-green-400">{photographer.price}</span>
                </div>

                {/* Portfolio Preview */}
                <div className="flex space-x-1">
                  {photographer.portfolio.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Portfolio ${idx + 1}`}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1 photography-gradient hover:opacity-90">
                    <Camera className="h-4 w-4 mr-1" />
                    Book Now
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-400/30 hover:bg-green-400/10">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
