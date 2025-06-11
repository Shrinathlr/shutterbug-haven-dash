
import { useState } from "react";
import { Send, Phone, Video, MoreVertical, Image, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Great! I'll send you the edited photos by tomorrow.",
      time: "2 min ago",
      unread: 2,
      online: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Mike Chen",
      lastMessage: "When would you like to schedule the portrait session?",
      time: "1 hour ago",
      unread: 0,
      online: false,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Emma Wilson",
      lastMessage: "The venue looks perfect for the event photography!",
      time: "3 hours ago",
      unread: 1,
      online: true,
      avatar: "/api/placeholder/40/40",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "photographer",
      content: "Hi! Thanks for booking a session with me. I'm excited to work with you!",
      time: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content: "Thank you! I'm looking forward to it. What should I prepare for the shoot?",
      time: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      sender: "photographer",
      content: "Here are some outfit suggestions and poses we could try:",
      time: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      sender: "photographer",
      content: "/api/placeholder/200/150",
      time: "10:35 AM",
      type: "image",
    },
    {
      id: 5,
      sender: "user",
      content: "Perfect! I love these ideas. Can we schedule for this weekend?",
      time: "10:40 AM",
      type: "text",
    },
  ];

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
            <div className="space-y-1">
              {chats.map((chat, index) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(index)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 border-l-4 ${
                    selectedChat === index
                      ? "bg-green-400/10 border-green-400"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-green-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="glassmorphism flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={chats[selectedChat]?.avatar} />
                  <AvatarFallback>{chats[selectedChat]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{chats[selectedChat]?.name}</h3>
                  <p className="text-sm text-green-400">
                    {chats[selectedChat]?.online ? "Online now" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" className="hover:bg-green-400/10">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-green-400/10">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-green-400/10">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "photography-gradient text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.type === "text" ? (
                    <p className="text-sm">{msg.content}</p>
                  ) : (
                    <img
                      src={msg.content}
                      alt="Shared image"
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-green-400/10">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-green-400/10">
                <Image className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-background border-green-400/30"
              />
              <Button
                onClick={handleSendMessage}
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
