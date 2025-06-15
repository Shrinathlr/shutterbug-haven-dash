
import { useState } from "react";
import { Download, Heart, Share2, Eye, Filter, Grid3X3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function PhotoGallery() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // No photo collections
  const photoCollections: any[] = [];

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
        {photoCollections.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No photos delivered yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
