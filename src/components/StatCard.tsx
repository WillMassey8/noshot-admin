
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  accentColor?: "blue" | "green" | "red" | "purple";
}

export function StatCard({ title, value, subtitle, trend, icon: Icon, accentColor = "blue" }: StatCardProps) {
  const getAccentClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent";
      case "green":
        return "border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent";
      case "red":
        return "border-l-red-500 bg-gradient-to-r from-red-50/50 to-transparent";
      case "purple":
        return "border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-transparent";
      default:
        return "border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent";
    }
  };

  return (
    <Card className={`p-6 bg-section-bg border-border shadow-sm border-l-4 ${getAccentClasses(accentColor)} hover:shadow-md transition-all duration-200 hover:scale-105 group cursor-pointer`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stat-small">{title}</p>
          {Icon && (
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-semibold text-stat-big">{value}</p>
          {trend && (
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? "text-success" : "text-destructive"
              }`}
            >
              {trend.isPositive ? "+" : ""}{trend.value}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-stat-small">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
