import React from "react";
import { RevenueStats } from "@/components/RevenueStats";

const Revenue = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Revenue & Subscriptions</h1>
        <p className="text-muted-foreground">Track revenue, subscriptions, and financial metrics</p>
      </div>
      
      <div>
        <RevenueStats />
      </div>
    </div>
  );
};

export default Revenue;