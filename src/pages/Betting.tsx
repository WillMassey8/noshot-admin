import React from "react";
import { BettingStats } from "@/components/BettingStats";
import { TrendingUp, Clock } from "lucide-react";

const Betting = () => {
  const getTimeStatus = () => {
    const now = new Date();
    return `Last updated: ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Betting Activity</h1>
              <p className="text-muted-foreground">Monitor betting statistics and user activity</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {getTimeStatus()}
          </div>
        </div>
      </div>
      
      <div>
        <BettingStats />
      </div>
    </div>
  );
};

export default Betting;