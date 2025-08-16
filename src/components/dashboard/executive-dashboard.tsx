import { MetricCard } from "@/components/ui/metric-card";
import { ChartCard } from "@/components/financial/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, PieChart, Users, Calendar, Download, RefreshCw } from "lucide-react";
import { UserProfile } from "@/components/onboarding/user-profile-setup";
import { AiChat } from "@/components/ai/ai-chat";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ExecutiveDashboardProps {
  userProfile: UserProfile;
}

export function ExecutiveDashboard({ userProfile }: ExecutiveDashboardProps) {
  const [currentView, setCurrentView] = useState<string>("default");
  
  // Sample data - would come from your financial data API
  
  // Cost forecast data for next 6 months
  const costForecastData = [
    { name: "Jan 2024", projected: 4500000, actual: 4300000, variance: -4.4 },
    { name: "Feb 2024", projected: 4650000, actual: 4450000, variance: -4.3 },
    { name: "Mar 2024", projected: 4800000, actual: null, variance: null },
    { name: "Apr 2024", projected: 4950000, actual: null, variance: null },
    { name: "May 2024", projected: 5100000, actual: null, variance: null },
    { name: "Jun 2024", projected: 5250000, actual: null, variance: null },
  ];

  const costBreakdownData = [
    { category: "Personnel", current: 1800000, projected: 1950000, growth: 8.3 },
    { category: "Technology", current: 1200000, projected: 1350000, growth: 12.5 },
    { category: "Marketing", current: 800000, projected: 900000, growth: 12.5 },
    { category: "Operations", current: 950000, projected: 1050000, growth: 10.5 },
    { category: "Other", current: 450000, projected: 500000, growth: 11.1 },
  ];

  const departmentCosts = [
    { name: "Engineering", current: 3200000, projected: 3500000, variance: 9.4 },
    { name: "Sales", current: 1800000, projected: 2000000, variance: 11.1 },
    { name: "Marketing", current: 1200000, projected: 1400000, variance: 16.7 },
    { name: "Operations", current: 950000, projected: 1050000, variance: 10.5 },
    { name: "Support", current: 650000, projected: 720000, variance: 10.8 },
  ];
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

  // Product performance data by country
  const productPerformanceData = [
    { name: "USA", value: 45200000 },
    { name: "Germany", value: 23800000 },
    { name: "UK", value: 18500000 },
    { name: "France", value: 16200000 },
    { name: "Japan", value: 12800000 },
    { name: "Canada", value: 8900000 }
  ];

  const productList = [
    { id: 1, name: "Enterprise Analytics Suite", revenue: "$42.3M", growth: 18.5, countries: 15 },
    { id: 2, name: "AI Marketing Platform", revenue: "$28.7M", growth: 24.1, countries: 12 },
    { id: 3, name: "Customer Data Platform", revenue: "$19.4M", growth: 12.3, countries: 8 },
    { id: 4, name: "Business Intelligence Pro", revenue: "$15.8M", growth: -2.1, countries: 18 },
    { id: 5, name: "Mobile Analytics", revenue: "$12.2M", growth: 31.2, countries: 22 }
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

  // Product drill-down data (exact numbers from screenshot)
  const productDrilldownTrendData = [
    { name: "Jan", Revenue: 4200000, Profit: 1050000 },
    { name: "Feb", Revenue: 4450000, Profit: 1100000 },
    { name: "Mar", Revenue: 4700000, Profit: 1150000 },
    { name: "Apr", Revenue: 5000000, Profit: 1200000 },
    { name: "May", Revenue: 5200000, Profit: 1250000 },
    { name: "Jun", Revenue: 5400000, Profit: 1300000 },
    { name: "Jul", Revenue: 5700000, Profit: 1350000 },
    { name: "Aug", Revenue: 5900000, Profit: 1400000 },
    { name: "Sep", Revenue: 6100000, Profit: 1450000 },
    { name: "Oct", Revenue: 6500000, Profit: 1550000 },
    { name: "Nov", Revenue: 6700000, Profit: 1600000 },
    { name: "Dec", Revenue: 7000000, Profit: 1700000 }
  ];

  const productDrilldownCountryData = [
    { name: "United States", Revenue: 2400000, Profit: 650000 },
    { name: "Germany", Revenue: 1800000, Profit: 450000 },
    { name: "United Kingdom", Revenue: 1600000, Profit: 400000 },
    { name: "France", Revenue: 1400000, Profit: 350000 },
    { name: "Japan", Revenue: 1300000, Profit: 300000 },
    { name: "Canada", Revenue: 1000000, Profit: 250000 },
    { name: "Australia", Revenue: 800000, Profit: 200000 },
    { name: "Netherlands", Revenue: 700000, Profit: 180000 }
  ];

  const handleDashboardChange = (view: string) => {
    setCurrentView(view);
  };

  // Product Drill-down Dashboard
  const renderProductDrilldown = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Product Performance Analysis</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Past 6 months drill-down view</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentView("default")} className="text-xs md:text-sm">
            Back to Dashboard
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics - Exact from screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          title="Total Revenue"
          value="$8.65M"
          change={12.3}
          changeType="percentage"
          trend="up"
          subtitle="vs last quarter"
        />
        <MetricCard
          title="Net Profit"
          value="$2.14M"
          change={8.7}
          changeType="percentage"
          trend="up"
          subtitle="vs last quarter"
        />
        <MetricCard
          title="Growth Rate"
          value="15.2%"
          change={3.1}
          changeType="percentage"
          trend="up"
          subtitle="vs last quarter"
        />
        <Card className="shadow-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Countries</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground mt-1">0% markets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trends">Revenue & Profit Trends</TabsTrigger>
          <TabsTrigger value="countries">Revenue & Profit by Country</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Revenue & Profit Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productDrilldownTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Profit" 
                      stroke="hsl(var(--financial-green))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--financial-green))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="countries">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Revenue & Profit by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productDrilldownCountryData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs fill-muted-foreground" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                      labelFormatter={(label) => `Country: ${label}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Profit" fill="hsl(var(--financial-green))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Render different views based on current state
  console.log("Current view:", currentView); // Debug log
  
  if (currentView === "product-drilldown") {
    return (
      <div className="p-4 md:p-6">
        {renderProductDrilldown()}
        <div className="mt-6">
          <AiChat onDashboardChange={handleDashboardChange} />
        </div>
      </div>
    );
  }

  if (currentView === "cost-forecast") {
    // For cost forecast, we'll just show the default dashboard with cost-forecast tab active
    // This is handled by the existing tabs structure
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{getDashboardTitle()}</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">{getWelcomeMessage()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-xs md:text-sm">
            <Download className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto">
          <TabsTrigger value="revenue" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Revenue Trends</span>
            <span className="sm:hidden">Revenue</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Expense Analysis</span>
            <span className="sm:hidden">Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Product Performance</span>
            <span className="sm:hidden">Products</span>
          </TabsTrigger>
          <TabsTrigger value="variance" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Variance Analysis</span>
            <span className="sm:hidden">Variance</span>
          </TabsTrigger>
          <TabsTrigger value="forecast" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Forecast vs Actual</span>
            <span className="sm:hidden">Accuracy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
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


        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <ChartCard
                title="Revenue by Country"
                data={productPerformanceData}
                type="bar"
              />
            </div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-financial-yellow" />
                  Top Markets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">USA</span>
                    <span className="text-sm font-medium">$45.2M (35.9%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Germany</span>
                    <span className="text-sm font-medium">$23.8M (18.9%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">UK</span>
                    <span className="text-sm font-medium">$18.5M (14.7%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">France</span>
                    <span className="text-sm font-medium">$16.2M (12.9%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Others</span>
                    <span className="text-sm font-medium">$21.7M (17.6%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Product Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-full space-y-3">
                  {productList.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 mb-2 sm:mb-0">
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.countries} countries</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium text-sm">{product.revenue}</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${product.growth > 0 
                            ? 'bg-financial-green/10 text-financial-green' 
                            : 'bg-financial-red/10 text-financial-red'
                          }`}
                        >
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
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

      {/* AI Chat Integration */}
      <div className="mt-6">
        <AiChat onDashboardChange={handleDashboardChange} />
      </div>
    </div>
  );
}