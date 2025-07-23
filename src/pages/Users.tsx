import React from "react";
import { StatCard } from "@/components/StatCard";
import { UsersTable } from "@/components/UsersTable";

const Users = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and monitor user activity</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <StatCard
          title="Total Users"
          value="2,847"
          trend={{ value: "12%", isPositive: true }}
          subtitle="All time"
        />
        <StatCard
          title="New Users This Week"
          value="156"
          trend={{ value: "8%", isPositive: true }}
          subtitle="Jan 15-22, 2024"
        />
        <StatCard
          title="Sportsbook Linked"
          value="1,923"
          subtitle="67.5% of total users"
        />
      </div>
      
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;