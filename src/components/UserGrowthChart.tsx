
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface UserGrowthData {
  period: string;
  users: number;
  date: string;
}

const userData: Record<string, UserGrowthData[]> = {
  day: [{ period: "Today", users: 0, date: "Today" }],
  week: [{ period: "This Week", users: 0, date: "This Week" }],
  month: [{ period: "This Month", users: 0, date: "This Month" }],
  year: [{ period: "This Year", users: 0, date: "This Year" }],
  "all-time": [{ period: "All Time", users: 0, date: "All Time" }],
};

export function UserGrowthChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("all-time");
  const data = userData[selectedPeriod];

  const currentValue = data[data.length - 1]?.users || 0;
  const previousValue = data[data.length - 2]?.users || 0;
  const change = currentValue - previousValue;
  const changePercent = previousValue ? ((change / previousValue) * 100).toFixed(2) : "0";

  const timeButtons = [
    { value: "day", label: "1D" },
    { value: "week", label: "1W" },
    { value: "month", label: "1M" },
    { value: "year", label: "1Y" },
    { value: "all-time", label: "ALL" },
  ];

  return (
    <Card className="bg-white border-0 shadow-none">
      <div className="p-6">
        <h3 className="text-3xl font-bold font-poppins text-center text-foreground mb-6">Revenue</h3>
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${currentValue.toLocaleString()}.31
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-600 mr-1">▲</span>
            <span className="text-green-600 font-medium">
              ${Math.abs(change).toLocaleString()}.47 ({changePercent}%)
            </span>
            <span className="text-gray-500 ml-1">all time</span>
          </div>
        </div>

        <div className="h-80 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey="period" 
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tickLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
                className="text-xs"
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tickLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
                className="text-xs"
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#00C805"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center space-x-1">
          {timeButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => setSelectedPeriod(button.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === button.value
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
