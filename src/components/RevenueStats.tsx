import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "./StatCard";
import { DollarSign, Users, Crown, TrendingDown } from "lucide-react";

interface RevenueData {
  period: string;
  revenue: number;
  subscriptions: {
    linked: number;
    nonLinked: number;
  };
  churnRate: number;
}

const mockRevenueData: Record<string, RevenueData> = {
  day: {
    period: "Today",
    revenue: 1247,
    subscriptions: { linked: 15, nonLinked: 8 },
    churnRate: 2.1,
  },
  week: {
    period: "This Week",
    revenue: 8934,
    subscriptions: { linked: 142, nonLinked: 67 },
    churnRate: 3.4,
  },
  month: {
    period: "This Month",
    revenue: 34250,
    subscriptions: { linked: 567, nonLinked: 289 },
    churnRate: 4.2,
  },
  year: {
    period: "This Year",
    revenue: 425680,
    subscriptions: { linked: 6840, nonLinked: 3520 },
    churnRate: 5.8,
  },
};

const cancelReasons = [
  { reason: "Too expensive", count: 23 },
  { reason: "Not enough value", count: 18 },
  { reason: "Technical issues", count: 12 },
  { reason: "Found better alternative", count: 9 },
  { reason: "No longer betting", count: 7 },
];

export function RevenueStats() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const data = mockRevenueData[selectedPeriod];

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">Revenue & Subscriptions</h2>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Revenue Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${data.revenue.toLocaleString()}`}
          subtitle={data.period}
          trend={{ value: "12.5%", isPositive: true }}
          icon={DollarSign}
          accentColor="green"
        />
        <StatCard
          title="Linked Subscriptions"
          value={data.subscriptions.linked}
          subtitle="$9.99/month"
          icon={Users}
          accentColor="blue"
        />
        <StatCard
          title="Non Linked Subscriptions"
          value={data.subscriptions.nonLinked}
          subtitle="$19.99/month"
          icon={Crown}
          accentColor="purple"
        />
        <StatCard
          title="Churn Rate"
          value={`${data.churnRate}%`}
          subtitle={data.period}
          trend={{ value: "0.8%", isPositive: false }}
          icon={TrendingDown}
          accentColor="red"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Subscriptions Breakdown */}
        <Card className="bg-section-bg border-border shadow-sm">
          <div className="p-6 border-b border-divider">
            <h3 className="text-lg font-semibold text-foreground">Active Subscriptions</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Linked Plan</p>
                <p className="text-xs text-stat-small">$9.99/month</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-stat-big">{data.subscriptions.linked}</p>
                <p className="text-xs text-stat-small">
                  ${(data.subscriptions.linked * 9.99).toLocaleString()}/month
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Non Linked Plan</p>
                <p className="text-xs text-stat-small">$19.99/month</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-stat-big">{data.subscriptions.nonLinked}</p>
                <p className="text-xs text-stat-small">
                  ${(data.subscriptions.nonLinked * 19.99).toLocaleString()}/month
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Cancel Reasons */}
        <Card className="bg-section-bg border-border shadow-sm">
          <div className="p-6 border-b border-divider flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Cancel Reasons</h3>
            <Button variant="outline" size="sm">
              View Stripe
            </Button>
          </div>
          <div className="p-6 space-y-3">
            {cancelReasons.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm text-foreground">{item.reason}</p>
                <span className="text-sm font-medium text-stat-big">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}