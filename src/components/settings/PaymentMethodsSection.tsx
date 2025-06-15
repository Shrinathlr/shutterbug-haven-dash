
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PaymentMethodsSection() {
  return (
    <Card className="glassmorphism animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-green-400" />
          <span>Payment Methods</span>
        </CardTitle>
        <CardDescription>Manage your payment options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-green-400/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs flex items-center justify-center">
              VISA
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/26</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-green-400/30">
            Edit
          </Button>
        </div>
        <Button variant="outline" className="w-full border-green-400/30 hover:bg-green-400/10">
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
}
