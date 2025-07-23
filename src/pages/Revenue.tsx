import React from "react";
import { RevenueStats } from "@/components/RevenueStats";
import { DollarSign, Clock } from "lucide-react";

const Revenue = () => {
  const getTimeStatus = () => {
    const now = new Date();
    return `Last updated: ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Revenue & Subscriptions</h1>
              <p className="text-muted-foreground">Track revenue, subscriptions, and financial metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {getTimeStatus()}
          </div>
        </div>
      </div>
      
      <div>
        <RevenueStats />
      </div>
    </div>
  );
};

export default Revenue;