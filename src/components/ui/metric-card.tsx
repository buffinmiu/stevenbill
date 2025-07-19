import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeType: "percentage" | "absolute";
  trend: "up" | "down" | "neutral";
  subtitle?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  trend,
  subtitle,
  className
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />;
      case "down":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-financial-green";
      case "down":
        return "text-financial-red";
      default:
        return "text-financial-gray";
    }
  };

  const formatChange = () => {
    const prefix = trend === "up" ? "+" : trend === "down" ? "-" : "";
    const suffix = changeType === "percentage" ? "%" : "";
    return `${prefix}${Math.abs(change)}${suffix}`;
  };

  return (
    <Card className={cn("shadow-card hover:shadow-elegant transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={cn("flex items-center space-x-1", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{formatChange()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}