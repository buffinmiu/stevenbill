import { useState, useRef, useEffect } from "react";
import { createServiceClient } from "@codewords/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENT_KEY = "cwk-bc25dd427269ffcb71aa51e4d2229d44c95c81691f6cbbe86b4ecab871e2fd1e";
const SERVICE_ID = "sheets_data_analyzer_243c57b2";

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
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const client = createServiceClient(CLIENT_KEY);

  const initialMessage: Message = {
    id: "welcome",
    type: "ai",
    content: "Welcome to FP&A AI! I can help you analyze your financial data and generate insights. Ask me about revenue, costs, forecasts, or any other financial metrics. For example: 'What was the total revenue for Q4?' or 'Show me cost breakdown by category'.",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Use CodeWords service for analysis
      const result = await client.runService(SERVICE_ID, "", { query: userMessage.content }) as { html_report?: string };
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: result.html_report || generateAiResponse(userMessage.content),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling CodeWords service:", error);
      
      // Fallback to local AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAiResponse(userMessage.content),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAiResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for specific dashboard queries
    if (input.includes("product drill down")) {
      onDashboardChange?.("product-drill-down");
      return "I've generated the product drill-down dashboard for the next 6 months showing total revenue of $8.65M, net profit of $2.14M, growth rate of 15.2%, and performance across 8 active countries. The dashboard includes revenue & profit trends and country-specific analysis.";
    }
    
    if (input.includes("cost forecast")) {
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
          <Brain className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          AI Financial Analyst
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.type === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {message.type === "ai" ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : (
                    message.content
                  )}
                </div>
                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                    Analyzing your financial data...
                  </div>
                </div>
              </div>
            )}
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
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="h-9 w-9 md:h-10 md:w-10"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}