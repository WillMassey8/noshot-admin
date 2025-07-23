
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

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
  const [selectedPeriod, setSelectedPeriod] = useState("all-time");
  const data = mockUserData[selectedPeriod];

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
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue</h3>
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

        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                dataKey="period" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide />
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
