import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Camera, Search, MessageCircle, Image, Calendar, Settings, Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Logout button logic
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "search", icon: Search, label: "Find Photographers" },
    { id: "chats", icon: MessageCircle, label: "Messages" },
    { id: "photos", icon: Image, label: "My Photos" },
    { id: "bookings", icon: Calendar, label: "Bookings" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 glassmorphism"
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b border-sidebar-border flex flex-col items-center">
            <img src="/lovable-uploads/629ff1a0-3d1a-43a1-96d9-ebbc51d02972.png" alt="Logo" className="w-24 h-24 object-contain mb-2" />
            <h1 className="text-xl font-bold text-sidebar-foreground text-center">Reels Studio</h1>
            <p className="text-sm text-muted-foreground text-center">Professional Photography</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover-scale ${
                  activeSection === item.id
                    ? "photography-gradient text-white shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <Button
              className="mt-3 w-full bg-destructive text-white"
              onClick={handleLogout}
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
