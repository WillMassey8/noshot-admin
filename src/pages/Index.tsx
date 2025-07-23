import { StatCard } from "@/components/StatCard";
import { UsersTable } from "@/components/UsersTable";
import { BettingStats } from "@/components/BettingStats";
import { RevenueStats } from "@/components/RevenueStats";
import { AdminTools } from "@/components/AdminTools";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-divider bg-section-bg">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/fc3944e2-6346-4b26-bac8-b0c8c5e2d63a.png" 
              alt="NoShot Logo" 
              className="h-60 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* User Overview */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">User Overview</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          <UsersTable />
        </section>

        {/* Horizontal Divider */}
        <div className="border-t border-divider"></div>

        {/* Betting Stats */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Betting Statistics</h2>
          <BettingStats />
        </section>

        {/* Horizontal Divider */}
        <div className="border-t border-divider"></div>

        {/* Revenue & Subscriptions */}
        <section>
          <RevenueStats />
        </section>

        {/* Horizontal Divider */}
        <div className="border-t border-divider"></div>

        {/* Admin Tools */}
        <section>
          <AdminTools />
        </section>
      </div>
    </div>
  );
};

export default Index;
