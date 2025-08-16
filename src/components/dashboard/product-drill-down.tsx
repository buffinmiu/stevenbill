import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ProductDrillDownProps {
  onBack?: () => void;
}

export function ProductDrillDown({ onBack }: ProductDrillDownProps) {
  // Product drill-down data (exact numbers from screenshot)
  const productTrendData = [
    { month: "Jan", Revenue: 4200000, Profit: 1050000 },
    { month: "Feb", Revenue: 4450000, Profit: 1100000 },
    { month: "Mar", Revenue: 4700000, Profit: 1150000 },
    { month: "Apr", Revenue: 5000000, Profit: 1200000 },
    { month: "May", Revenue: 5200000, Profit: 1250000 },
    { month: "Jun", Revenue: 5400000, Profit: 1300000 },
    { month: "Jul", Revenue: 5700000, Profit: 1350000 },
    { month: "Aug", Revenue: 5900000, Profit: 1400000 },
    { month: "Sep", Revenue: 6100000, Profit: 1450000 },
    { month: "Oct", Revenue: 6500000, Profit: 1550000 },
    { month: "Nov", Revenue: 6700000, Profit: 1600000 },
    { month: "Dec", Revenue: 7000000, Profit: 1700000 }
  ];

  const countryData = [
    { country: "United States", Revenue: 2400000, Profit: 650000 },
    { country: "Germany", Revenue: 1800000, Profit: 450000 },
    { country: "United Kingdom", Revenue: 1600000, Profit: 400000 },
    { country: "France", Revenue: 1400000, Profit: 350000 },
    { country: "Japan", Revenue: 1300000, Profit: 300000 },
    { country: "Canada", Revenue: 1000000, Profit: 250000 },
    { country: "Australia", Revenue: 800000, Profit: 200000 },
    { country: "Netherlands", Revenue: 700000, Profit: 180000 }
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Product Performance Analysis</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Next 6 months drill-down view</p>
        </div>
        <div className="flex gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="text-xs md:text-sm">
              Back to Dashboard
            </Button>
          )}
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
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
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
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle>Revenue & Profit Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
                      className="text-xs fill-muted-foreground" 
                    />
                    <YAxis 
                      className="text-xs fill-muted-foreground"
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${(value / 1000000).toFixed(2)}M`, 
                        name
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      name="Revenue"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Profit" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="countries">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle>Revenue & Profit by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countryData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="country" 
                      className="text-xs fill-muted-foreground" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis 
                      className="text-xs fill-muted-foreground"
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${(value / 1000000).toFixed(2)}M`, 
                        name
                      ]}
                      labelFormatter={(label) => `Country: ${label}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="Revenue" 
                      fill="hsl(var(--primary))" 
                      radius={[2, 2, 0, 0]}
                      name="Revenue"
                    />
                    <Bar 
                      dataKey="Profit" 
                      fill="hsl(var(--chart-2))" 
                      radius={[2, 2, 0, 0]}
                      name="Profit"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}