import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, DollarSign, Package, Users, Wrench } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface CostForecastProps {
  onBack: () => void;
}

export function CostForecast({ onBack }: CostForecastProps) {
  // Top metrics data
  const metrics = [
    {
      title: "OPEX (Operating Expenses)",
      value: "$56.2M",
      subtitle: "58.3% of total costs",
      change: 5.2,
      changeType: "percentage" as const,
      trend: "up" as const
    },
    {
      title: "Cost of Goods Sold",
      value: "$40.2M",
      subtitle: "41.7% of total costs",
      change: 2.1,
      changeType: "percentage" as const,
      trend: "down" as const
    },
    {
      title: "Headcount Expenses",
      value: "$19.1M",
      subtitle: "34.0% of OPEX",
      change: 8.4,
      changeType: "percentage" as const,
      trend: "up" as const
    },
    {
      title: "Direct Materials",
      value: "$24.2M",
      subtitle: "60.2% of COGS",
      change: 3.7,
      changeType: "percentage" as const,
      trend: "up" as const
    }
  ];

  // Cost structure breakdown data (donut chart)
  const costStructureData = [
    { name: "OPEX", value: 58.3, color: "hsl(var(--financial-blue))" },
    { name: "COGS", value: 41.7, color: "hsl(var(--accent))" }
  ];

  // OPEX breakdown data (pie chart)
  const opexBreakdownData = [
    { name: "Headcount", value: 34, color: "hsl(var(--success))" },
    { name: "R&D", value: 28, color: "hsl(var(--primary))" },
    { name: "Sales", value: 15, color: "hsl(var(--accent))" },
    { name: "Marketing", value: 12, color: "hsl(var(--financial-red))" },
    { name: "G&A", value: 7, color: "hsl(var(--financial-blue))" },
    { name: "IT", value: 4, color: "hsl(var(--warning))" }
  ];

  // Quarterly cost distribution data
  const quarterlyData = [
    { quarter: "Q1", cost: 18 },
    { quarter: "Q2", cost: 26 },
    { quarter: "Q3", cost: 25 },
    { quarter: "Q4", cost: 25 }
  ];

  // Cost by product data
  const productCostData = [
    { product: "Product A", cost: 33 },
    { product: "Product B", cost: 27 },
    { product: "Product C", cost: 22 },
    { product: "Product D", cost: 16 }
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.name}: ${entry.value}%`;
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-background h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">6-Month Cost Forecast</h1>
          <p className="text-muted-foreground">Comprehensive cost analysis and projections</p>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            change={metric.change}
            changeType={metric.changeType}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Structure Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Cost Structure Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costStructureData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {costStructureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* OPEX Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              OPEX Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={opexBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {opexBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quarterly Cost Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Quarterly Cost Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}M`, "Cost"]} />
                <Bar dataKey="cost" fill="hsl(var(--financial-blue))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost by Product */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Cost by Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}M`, "Cost"]} />
                <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}