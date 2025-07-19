import { MetricCard } from "@/components/ui/metric-card";
import { ChartCard } from "@/components/financial/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, PieChart, Users, Calendar, Download, RefreshCw } from "lucide-react";
import { UserProfile } from "@/components/onboarding/user-profile-setup";
import { AiChat } from "@/components/ai/ai-chat";

interface ExecutiveDashboardProps {
  userProfile: UserProfile;
}

export function ExecutiveDashboard({ userProfile }: ExecutiveDashboardProps) {
  // Sample data - would come from your financial data API
  const revenueData = [
    { name: "Q1", value: 24000000, forecast: 25000000 },
    { name: "Q2", value: 26500000, forecast: 27000000 },
    { name: "Q3", value: 28900000, forecast: 28500000 },
    { name: "Q4", value: 31200000, forecast: 30500000 }
  ];

  const expenseData = [
    { name: "Jan", value: 1200000 },
    { name: "Feb", value: 1350000 },
    { name: "Mar", value: 1180000 },
    { name: "Apr", value: 1420000 },
    { name: "May", value: 1380000 },
    { name: "Jun", value: 1450000 }
  ];

  const getDashboardTitle = () => {
    const roleMap: { [key: string]: string } = {
      "ceo": "Executive Overview",
      "cfo": "Financial Command Center",
      "vp-finance": "Finance Leadership Dashboard",
      "director": "Directional Analytics",
      "controller": "Financial Control Center",
      "analyst": "Analysis Workspace",
      "manager": "Management Dashboard"
    };
    return roleMap[userProfile.role] || "Financial Dashboard";
  };

  const getWelcomeMessage = () => {
    const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening";
    return `Good ${timeOfDay}! Here's your financial overview for today.`;
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Main Dashboard Content */}
      <div className="flex-1 space-y-6 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{getDashboardTitle()}</h1>
            <p className="text-muted-foreground mt-1">{getWelcomeMessage()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Revenue (YTD)"
          value="$110.6M"
          change={8.2}
          changeType="percentage"
          trend="up"
          subtitle="vs. $102.1M last year"
        />
        <MetricCard
          title="Gross Margin"
          value="68.5%"
          change={1.3}
          changeType="percentage"
          trend="up"
          subtitle="vs. 67.2% last quarter"
        />
        <MetricCard
          title="Operating Expenses"
          value="$42.3M"
          change={3.1}
          changeType="percentage"
          trend="down"
          subtitle="vs. budget of $43.7M"
        />
        <MetricCard
          title="EBITDA"
          value="$35.8M"
          change={12.4}
          changeType="percentage"
          trend="up"
          subtitle="32.4% margin"
        />
      </div>

      {/* Charts and Analysis */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Forecast vs Actual</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ChartCard
                title="Quarterly Revenue Performance"
                data={revenueData}
                type="line"
                showForecast={true}
              />
            </div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-financial-green" />
                  Revenue Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Q4 Performance</span>
                  <Badge variant="secondary" className="bg-financial-green/10 text-financial-green">
                    +2.3% vs Forecast
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Growth Rate</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    +8.2% YoY
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <Badge variant="secondary" className="bg-financial-green/10 text-financial-green">
                    Accelerating
                  </Badge>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Revenue growth is outpacing forecast by 2.3%. Strong performance in Q4 driven by seasonal demand and new product launches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ChartCard
                title="Monthly Operating Expenses"
                data={expenseData}
                type="bar"
              />
            </div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-financial-blue" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Personnel</span>
                    <span className="text-sm font-medium">$25.2M (59.6%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology</span>
                    <span className="text-sm font-medium">$8.7M (20.6%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marketing</span>
                    <span className="text-sm font-medium">$5.1M (12.1%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">$3.3M (7.7%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Budget vs Actual Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-financial-green/5 rounded-lg">
                    <span className="font-medium">Revenue</span>
                    <div className="text-right">
                      <div className="text-financial-green font-medium">+$2.3M</div>
                      <div className="text-xs text-muted-foreground">2.1% favorable</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-financial-red/5 rounded-lg">
                    <span className="font-medium">OpEx</span>
                    <div className="text-right">
                      <div className="text-financial-red font-medium">+$1.4M</div>
                      <div className="text-xs text-muted-foreground">3.3% unfavorable</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-financial-green/5 rounded-lg">
                    <span className="font-medium">EBITDA</span>
                    <div className="text-right">
                      <div className="text-financial-green font-medium">+$0.9M</div>
                      <div className="text-xs text-muted-foreground">2.6% favorable</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Key Variance Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium text-sm">Higher than expected sales volume</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      +$2.8M revenue impact due to strong Q4 performance
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium text-sm">Technology infrastructure costs</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      +$0.9M expense due to cloud migration project
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="font-medium text-sm">Marketing campaign efficiency</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      -$0.5M expense savings from digital optimization
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ChartCard
                title="Forecast Accuracy Analysis"
                data={revenueData}
                type="line"
                showForecast={true}
              />
            </div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Forecast Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-primary rounded-lg text-white">
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="text-sm opacity-90">Forecast Accuracy</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Q1 Accuracy</span>
                    <span className="font-medium">96.0%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Q2 Accuracy</span>
                    <span className="font-medium">98.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Q3 Accuracy</span>
                    <span className="font-medium">87.6%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Q4 Accuracy</span>
                    <span className="font-medium">95.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>

      {/* AI Chat Sidebar */}
      <div className="w-96 border-l border-border bg-card/30 backdrop-blur-sm">
        <div className="h-full p-4">
          <AiChat className="h-full" />
        </div>
      </div>
    </div>
  );
}