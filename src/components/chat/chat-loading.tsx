import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Loader2 } from "lucide-react";

export function ChatLoading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 mb-4 justify-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>
      
      <div className="max-w-[80%] space-y-1">
        <Card className="p-4 bg-card text-card-foreground border-border shadow-card">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Analyzing your financial data{dots}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This may take 30-60 seconds while we process your P&L data
          </p>
        </Card>
      </div>
    </div>
  );
}