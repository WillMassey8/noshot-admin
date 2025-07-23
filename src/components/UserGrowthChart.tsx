import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface UserGrowthData {
  period: string;
  users: number;
  date: string;
}

const mockUserData: Record<string, UserGrowthData[]> = {
  day: [
    { period: "00:00", users: 2847, date: "Today" },
    { period: "04:00", users: 2851, date: "Today" },
    { period: "08:00", users: 2863, date: "Today" },
    { period: "12:00", users: 2879, date: "Today" },
    { period: "16:00", users: 2894, date: "Today" },
    { period: "20:00", users: 2908, date: "Today" },
    { period: "24:00", users: 2915, date: "Today" },
  ],
  week: [
    { period: "Mon", users: 2765, date: "Jan 15" },
    { period: "Tue", users: 2789, date: "Jan 16" },
    { period: "Wed", users: 2812, date: "Jan 17" },
    { period: "Thu", users: 2834, date: "Jan 18" },
    { period: "Fri", users: 2856, date: "Jan 19" },
    { period: "Sat", users: 2881, date: "Jan 20" },
    { period: "Sun", users: 2915, date: "Jan 21" },
  ],
  month: [
    { period: "Week 1", users: 2456, date: "Jan 1-7" },
    { period: "Week 2", users: 2578, date: "Jan 8-14" },
    { period: "Week 3", users: 2723, date: "Jan 15-21" },
    { period: "Week 4", users: 2915, date: "Jan 22-28" },
  ],
  year: [
    { period: "Q1", users: 1850, date: "Jan-Mar 2023" },
    { period: "Q2", users: 2150, date: "Apr-Jun 2023" },
    { period: "Q3", users: 2480, date: "Jul-Sep 2023" },
    { period: "Q4", users: 2915, date: "Oct-Dec 2023" },
  ],
  "all-time": [
    { period: "2020", users: 245, date: "2020" },
    { period: "2021", users: 892, date: "2021" },
    { period: "2022", users: 1456, date: "2022" },
    { period: "2023", users: 2915, date: "2023" },
  ],
};

export function UserGrowthChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const data = mockUserData[selectedPeriod];

  const formatTooltipValue = (value: number) => {
    return [`${value.toLocaleString()} users`, "Total Users"];
  };

  const formatTooltipLabel = (label: string) => {
    const dataPoint = data.find(d => d.period === label);
    return dataPoint ? `${label} (${dataPoint.date})` : label;
  };

  return (
    <Card className="bg-section-bg border-border shadow-sm">
      <div className="p-6 border-b border-divider">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--divider))" />
              <XAxis 
                dataKey="period" 
                stroke="hsl(var(--stat-small))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--stat-small))"
                fontSize={12}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={formatTooltipLabel}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ 
                  fill: "hsl(var(--primary))", 
                  strokeWidth: 2, 
                  r: 4,
                  stroke: "hsl(var(--card))"
                }}
                activeDot={{ 
                  r: 6, 
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--card))",
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}