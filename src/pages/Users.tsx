import React from "react";
import { StatCard } from "@/components/StatCard";
import { UsersTable } from "@/components/UsersTable";
import { Users as UsersIcon, UserPlus, Link, Clock } from "lucide-react";

const Users = () => {
  const getTimeStatus = () => {
    const now = new Date();
    return `Last updated: ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts and monitor user activity</p>
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
          icon={UsersIcon}
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
          title="Sportsbook Linked"
          value="1,923"
          subtitle="67.5% of total users"
          icon={Link}
          accentColor="purple"
        />
      </div>
      
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;