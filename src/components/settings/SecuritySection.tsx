
import { Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SecuritySection() {
  return (
    <Card className="glassmorphism animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span>Security</span>
        </CardTitle>
        <CardDescription>Manage your account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
          Change Password
        </Button>
        <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
          Enable Two-Factor Auth
        </Button>
        <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
          Download Data
        </Button>
      </CardContent>
    </Card>
  );
}
