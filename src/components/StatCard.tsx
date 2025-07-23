import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, subtitle, trend }: StatCardProps) {
  return (
    <Card className="p-6 bg-section-bg border-border shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-medium text-stat-small">{title}</p>
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