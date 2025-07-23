
import React from "react";
import { StatCard } from "@/components/StatCard";
import { UserGrowthChart } from "@/components/UserGrowthChart";
import { QuickActions } from "@/components/QuickActions";
import { RecentActivity } from "@/components/RecentActivity";
import { AlertCards } from "@/components/AlertCards";
import { Users, UserPlus, TrendingDown, Clock } from "lucide-react";

const Dashboard = () => {
  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getTimeStatus = () => {
    const now = new Date();
    return `Last updated: ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {getGreeting()}, Will
            </h1>
            <p className="text-muted-foreground">
              Welcome to your NoShot admin dashboard. Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {getTimeStatus()}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <StatCard
          title="Total Users"
          value="2,847"
          trend={{ value: "12%", isPositive: true }}
          subtitle="All time"
          icon={Users}
          accentColor="blue"
        />
        <StatCard
          title="New Users This Week"
          value="156"
          trend={{ value: "8%", isPositive: true }}
          subtitle="Jan 15-22, 2024"
          icon={UserPlus}
          accentColor="green"
        />
        <StatCard
          title="Monthly Churn Rate"
          value="2.3%"
          trend={{ value: "0.8%", isPositive: false }}
          subtitle="Users who cancelled this month"
          icon={TrendingDown}
          accentColor="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2">
          <UserGrowthChart />
        </div>
        
        {/* Right Column - Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
        
        {/* Alerts */}
        <div>
          <AlertCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
