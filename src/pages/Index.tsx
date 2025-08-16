import { useState } from "react";
import { UserProfileSetup, UserProfile } from "@/components/onboarding/user-profile-setup";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";
import { AiChat } from "@/components/ai/ai-chat";
import { ProductDrillDown } from "@/components/dashboard/product-drill-down";
import { CostForecast } from "@/components/dashboard/cost-forecast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart3, Settings, Brain, ChevronDown, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentView, setCurrentView] = useState<string>("default");

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleDashboardChange = (view: string) => {
    console.log("Index: Dashboard view change requested:", view); // Debug log
    setCurrentView(view);
    console.log("Index: Dashboard view updated to:", view); // Debug log
  };

  const renderDashboardContent = () => {
    if (currentView === "product-drill-down") {
      return <ProductDrillDown onBack={() => setCurrentView("default")} />;
    }
    if (currentView === "cost-forecast") {
      return <CostForecast onBack={() => setCurrentView("default")} />;
    }
    return <ExecutiveDashboard userProfile={userProfile} currentView={currentView} onViewChange={handleDashboardChange} />;
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <UserProfileSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground">FP&A AI</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Intelligent Financial Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                <Settings className="h-4 w-4" />
              </Button>
              
              {/* Profile Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Profile</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                  <Card className="shadow-card border-0">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2">Your Profile</h3>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Role:</span>
                          <span className="font-medium capitalize">{userProfile.role.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Department:</span>
                          <span className="font-medium capitalize">{userProfile.department.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Scope:</span>
                          <span className="font-medium capitalize">{userProfile.reportingLevel}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => setUserProfile(null)}
                        >
                          Reset Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        {/* Mobile: Tabs Layout */}
        <div className="block lg:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b border-border bg-background/95 backdrop-blur sticky top-[64px] z-40">
              <TabsList className="grid w-full grid-cols-2 h-12 m-2">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Chat
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="mt-0 p-4">
              {renderDashboardContent()}
            </TabsContent>
            
            <TabsContent value="chat" className="mt-0 p-4">
              <AiChat className="h-[calc(100vh-140px)]" onDashboardChange={handleDashboardChange} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: Resizable Panels Layout */}
        <div className="hidden lg:block h-full">
          <ResizablePanelGroup direction="horizontal">
            {/* Dashboard Panel */}
            <ResizablePanel defaultSize={70} minSize={30} collapsible>
              <div className="h-full">
                {renderDashboardContent()}
              </div>
            </ResizablePanel>

            {/* Resizable Handle */}
            <ResizableHandle withHandle />

            {/* AI Chat Panel */}
            <ResizablePanel defaultSize={30} minSize={25} collapsible>
              <div className="h-full p-6">
                <AiChat className="h-full" onDashboardChange={handleDashboardChange} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default Index;
