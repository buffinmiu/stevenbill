import { useState } from "react";
import { UserProfileSetup, UserProfile } from "@/components/onboarding/user-profile-setup";
import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";
import { AiChat } from "@/components/ai/ai-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart3, Settings, Brain, ChevronDown, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
              
              {/* Profile Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
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
      <div className="container mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex h-[calc(100vh-80px)]">
            {/* Tab Navigation - Compact */}
            <div className="w-16 border-r border-border bg-card/30 backdrop-blur-sm p-2">
              <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-0">
                <TabsTrigger 
                  value="dashboard" 
                  className="w-12 h-12 p-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger 
                  value="chat" 
                  className="w-12 h-12 p-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <MessageSquare className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
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
