
import { useState } from "react";
import { Download, Heart, Share2, Eye, Filter, Grid3X3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function PhotoGallery() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const photoCollections = [
    {
      id: 1,
      title: "Wedding - Central Park",
      photographer: "Sarah Johnson",
      date: "December 8, 2024",
      photos: 45,
      delivered: true,
      cover: "/api/placeholder/400/300",
      images: Array.from({ length: 12 }, (_, i) => `/api/placeholder/300/300?${i}`),
    },
    {
      id: 2,
      title: "Portrait Session",
      photographer: "Mike Chen",
      date: "November 20, 2024",
      photos: 18,
      delivered: true,
      cover: "/api/placeholder/400/300",
      images: Array.from({ length: 8 }, (_, i) => `/api/placeholder/300/300?${i + 12}`),
    },
    {
      id: 3,
      title: "Corporate Event",
      photographer: "Emma Wilson",
      date: "November 15, 2024",
      photos: 32,
      delivered: false,
      cover: "/api/placeholder/400/300",
      images: Array.from({ length: 10 }, (_, i) => `/api/placeholder/300/300?${i + 20}`),
    },
  ];

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "wedding", label: "Wedding" },
    { id: "portrait", label: "Portrait" },
    { id: "event", label: "Events" },
    { id: "delivered", label: "Delivered" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Photos</h1>
          <p className="text-muted-foreground">View and download your delivered photographs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "photography-gradient" : "border-green-400/30 hover:bg-green-400/10"}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "photography-gradient" : "border-green-400/30 hover:bg-green-400/10"}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="glassmorphism animate-fade-in">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={selectedFilter === filter.id ? "photography-gradient" : "border-green-400/30 hover:bg-green-400/10"}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Collections */}
      <div className="space-y-6">
        {photoCollections.map((collection, index) => (
          <Card key={collection.id} className="glassmorphism animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-foreground">{collection.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>by {collection.photographer}</span>
                    <span>{collection.date}</span>
                    <span>{collection.photos} photos</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={collection.delivered ? "bg-green-400/20 text-green-400" : "bg-yellow-400/20 text-yellow-400"}>
                    {collection.delivered ? "Delivered" : "Processing"}
                  </Badge>
                  {collection.delivered && (
                    <Button size="sm" className="photography-gradient hover:opacity-90">
                      <Download className="h-4 w-4 mr-1" />
                      Download All
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {collection.images.slice(0, 11).map((image, imgIndex) => (
                  <Dialog key={imgIndex}>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer hover-scale">
                        <img
                          src={image}
                          alt={`Photo ${imgIndex + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-black/90 border-green-400/30">
                      <div className="relative">
                        <img
                          src={image}
                          alt={`Photo ${imgIndex + 1}`}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
                {collection.images.length > 11 && (
                  <div className="relative bg-muted/30 rounded-lg h-24 flex items-center justify-center cursor-pointer hover-scale">
                    <span className="text-green-400 font-semibold">+{collection.images.length - 11} more</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
