import { useState } from "react";
import { UserProfileSetup, UserProfile } from "@/components/onboarding/user-profile-setup";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";
import { AiChat } from "@/components/ai/ai-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart3, Settings, TrendingUp, Brain } from "lucide-react";

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FP&A AI</h1>
                <p className="text-xs text-muted-foreground">Intelligent Financial Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUserProfile(null)}
              >
                Reset Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex h-[calc(100vh-80px)]">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r border-border bg-card/30 backdrop-blur-sm p-4">
              <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-0">
                <TabsTrigger 
                  value="dashboard" 
                  className="w-full justify-start gap-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="chat" 
                  className="w-full justify-start gap-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <MessageSquare className="h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              {/* Profile Summary */}
              <Card className="mt-6 shadow-card">
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
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold text-sm text-foreground mb-3">Quick Actions</h3>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Create Forecast
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Question
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
              <TabsContent value="dashboard" className="m-0 h-full">
                <ExecutiveDashboard userProfile={userProfile} />
              </TabsContent>

              <TabsContent value="chat" className="m-0 h-full p-6">
                <div className="max-w-4xl mx-auto">
                  <AiChat className="h-full" />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
