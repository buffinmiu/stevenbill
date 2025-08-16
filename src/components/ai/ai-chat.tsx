import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AiChatProps {
  className?: string;
  onDashboardChange?: (view: string) => void;
}

export function AiChat({ className, onDashboardChange }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI Financial Analyst. I can help you with forecasting, budgeting, variance analysis, and financial reporting. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAiResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAiResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Check for specific product drill-down query
    if (input.includes("product drill down") && input.includes("6 months")) {
      onDashboardChange?.("product-drilldown");
      return "I've generated the product drill-down dashboard for the past 6 months showing total revenue of $8.65M, net profit of $2.14M, growth rate of 15.2%, and performance across 8 active countries. The dashboard includes revenue & profit trends and country-specific analysis.";
    }
    
    // Check for cost forecast query
    if (input.includes("forecast") && input.includes("6 months") && input.includes("cost")) {
      onDashboardChange?.("cost-forecast");
      return "I've generated a comprehensive 6-month cost forecast dashboard showing projected costs of $29.25M with detailed breakdowns by category, department, and monthly projections.";
    }
    
    const responses = [
      "Based on current data trends, I recommend reviewing Q4 revenue projections. The variance analysis shows a 15% deviation from forecast.",
      "I've analyzed the budget vs actual performance. Would you like me to generate a detailed variance report for management review?",
      "The financial metrics indicate strong performance in operational efficiency. Let me prepare a comprehensive dashboard for your review.",
      "I can help you create scenario models for different market conditions. What specific variables would you like to analyze?",
      "The cash flow forecast shows seasonal patterns. I suggest adjusting the working capital projections for Q1."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Bot className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          AI Financial Analyst
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.type === "ai" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 md:px-4 py-2 max-w-[85%] md:max-w-[80%]",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-8 md:ml-12"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-xs md:text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 md:p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me about financial analysis..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm"
            />
            <Button onClick={handleSend} size="icon" className="h-9 w-9 md:h-10 md:w-10">
              <Send className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}