
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchPhotographers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Remove photographer listings
  const photographers: any[] = [];

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
        {photographers.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No photographers found. Please try changing your search terms or filters.
          </div>
        ) : null}
      </div>
    </div>
  );
}
