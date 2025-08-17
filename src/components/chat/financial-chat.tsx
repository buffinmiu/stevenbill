import { useState, useRef, useEffect } from "react";
import { createServiceClient } from "@codewords/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessageComponent, type ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ChatLoading } from "./chat-loading";
import { Button } from "@/components/ui/button";
import { BarChart3, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const CLIENT_KEY = "cwk-bc25dd427269ffcb71aa51e4d2229d44c95c81691f6cbbe86b4ecab871e2fd1e";
const SERVICE_ID = "sheets_data_analyzer_243c57b2";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  type: "ai",
  content: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-primary">Welcome to Financial Data Analyzer</h3>
      <p>I'm your AI assistant for analyzing P&L forecast data. I can help you understand your financial performance across 9,360+ rows of data including revenue, costs, OPEX, and other income/expenses.</p>
      
      <div class="bg-muted/50 p-3 rounded-lg">
        <h4 class="font-medium mb-2">Example questions you can ask:</h4>
        <ul class="text-sm space-y-1 text-muted-foreground">
          <li>• "What was the total revenue for Q4?"</li>
          <li>• "Show me cost breakdown by category for 2024"</li>
          <li>• "Compare Q1 vs Q4 performance"</li>
          <li>• "Which product had the highest profit margin?"</li>
          <li>• "What were the costs forecasted in February?"</li>
        </ul>
      </div>
      
      <p class="text-sm text-muted-foreground">Ask me anything about your financial data and I'll provide detailed analysis with charts and insights.</p>
    </div>
  `,
  timestamp: new Date(),
};

export function FinancialChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const client = createServiceClient(CLIENT_KEY);

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

  const handleSendMessage = async (userMessage: string) => {
    const userMessageObj: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      const result = await client.runService(SERVICE_ID, "", { query: userMessage }) as { html_report?: string };
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: result.html_report || "I apologize, but I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error calling CodeWords service:", error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `
          <div class="text-destructive">
            <p><strong>Error:</strong> I encountered an issue while analyzing your data.</p>
            <p class="text-sm mt-2">Please try again or rephrase your question. If the problem persists, the service might be temporarily unavailable.</p>
          </div>
        `,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      toast.error("Failed to analyze data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    toast.info("Chat history cleared");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-background">
      <Card className="flex-1 flex flex-col shadow-elegant border-0">
        <CardHeader className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Financial Data Analyzer</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              disabled={isLoading || messages.length <= 1}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessageComponent key={message.id} message={message} />
              ))}
              {isLoading && <ChatLoading />}
            </div>
          </ScrollArea>
          
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}