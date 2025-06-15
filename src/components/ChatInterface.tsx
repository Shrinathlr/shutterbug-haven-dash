
import { useState } from "react";
import { Send, Phone, Video, MoreVertical, Image, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatInterface() {
  // Empty chats/messages
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats: any[] = [];
  const messages: any[] = [];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 h-screen overflow-hidden">
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* Chat List */}
        <Card className="glassmorphism w-full lg:w-80 flex-shrink-0">
          <CardHeader className="border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-center text-muted-foreground py-20">No messages or chats yet.</div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="glassmorphism flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-border flex-shrink-0 min-h-[80px] flex items-center justify-center">
            <div className="text-muted-foreground">No chat selected.</div>
          </CardHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <div className="text-muted-foreground">No conversation to display.</div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 flex-shrink-0 opacity-60 pointer-events-none">
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-green-400/10" disabled>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-green-400/10" disabled>
                <Image className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                disabled
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-background border-green-400/30"
              />
              <Button
                disabled
                className="photography-gradient hover:opacity-90 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
// NOTE: This file is growing. You may want to refactor it into smaller components for maintainability.
