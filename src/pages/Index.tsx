
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { SearchPhotographers } from "@/components/SearchPhotographers";
import { ChatInterface } from "@/components/ChatInterface";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BookingHistory } from "@/components/BookingHistory";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "search":
        return <SearchPhotographers />;
      case "chats":
        return <ChatInterface />;
      case "photos":
        return <PhotoGallery />;
      case "bookings":
        return <BookingHistory />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 lg:ml-64">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
