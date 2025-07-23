import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface BetterStat {
  name: string;
  value: string;
  metric: string;
  trend?: string;
}

interface PendingBet {
  id: string;
  bettor: string;
  game: string;
  bet: string;
  fadeConfidence: number;
  amount: string;
}

const mockFadedBettors: BetterStat[] = [
  { name: "TailGater99", value: "14", metric: "times faded", trend: "+3 this week" },
  { name: "SharpShooter", value: "12", metric: "times faded", trend: "+2 this week" },
  { name: "BetKing23", value: "11", metric: "times faded", trend: "+1 this week" },
  { name: "LuckyStreak", value: "9", metric: "times faded", trend: "+4 this week" },
  { name: "SportsFan88", value: "8", metric: "times faded", trend: "+1 this week" },
];

const mockColdStreaks: BetterStat[] = [
  { name: "ColdHands", value: "0-12", metric: "current streak" },
  { name: "BadLuck", value: "1-11", metric: "last 12 bets" },
  { name: "Slumping", value: "2-10", metric: "last 12 bets" },
  { name: "Struggling", value: "1-9", metric: "last 10 bets" },
  { name: "OffDay", value: "0-8", metric: "current streak" },
];

const mockWorstBettors: BetterStat[] = [
  { name: "AlwaysWrong", value: "-24.5", metric: "units lost" },
  { name: "MoneyDrain", value: "-19.2", metric: "units lost" },
  { name: "BadPicks", value: "-15.8", metric: "units lost" },
  { name: "LossLeader", value: "-12.3", metric: "units lost" },
  { name: "SinkHole", value: "-11.1", metric: "units lost" },
];

const mockPendingBets: PendingBet[] = [
  {
    id: "1",
    bettor: "TailGater99",
    game: "Lakers vs Warriors",
    bet: "Lakers +5.5",
    fadeConfidence: 92,
    amount: "$500",
  },
  {
    id: "2",
    bettor: "SharpShooter",
    game: "Cowboys vs Eagles",
    bet: "Over 48.5",
    fadeConfidence: 87,
    amount: "$300",
  },
  {
    id: "3",
    bettor: "BetKing23",
    game: "Heat vs Knicks",
    bet: "Heat ML",
    fadeConfidence: 84,
    amount: "$250",
  },
];

export function BettingStats() {
  const [activeTab, setActiveTab] = useState("week");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Most Faded Bettors */}
            <Card className="bg-section-bg border-border shadow-sm">
              <div className="p-6 border-b border-divider">
                <h3 className="text-lg font-semibold text-foreground">Most Faded</h3>
              </div>
              <div className="p-6 space-y-4">
                {mockFadedBettors.map((better, index) => (
                  <div key={better.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{better.name}</p>
                      <p className="text-xs text-stat-small">{better.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-stat-big">{better.value}</p>
                      <p className="text-xs text-stat-small">{better.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Coldest Streaks */}
            <Card className="bg-section-bg border-border shadow-sm">
              <div className="p-6 border-b border-divider">
                <h3 className="text-lg font-semibold text-foreground">Coldest Streaks</h3>
              </div>
              <div className="p-6 space-y-4">
                {mockColdStreaks.map((better, index) => (
                  <div key={better.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{better.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-destructive">{better.value}</p>
                      <p className="text-xs text-stat-small">{better.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Worst Bettors */}
            <Card className="bg-section-bg border-border shadow-sm">
              <div className="p-6 border-b border-divider">
                <h3 className="text-lg font-semibold text-foreground">Worst Performers</h3>
              </div>
              <div className="p-6 space-y-4">
                {mockWorstBettors.map((better, index) => (
                  <div key={better.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{better.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-destructive">{better.value}</p>
                      <p className="text-xs text-stat-small">{better.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Pending Bets */}
          <Card className="bg-section-bg border-border shadow-sm">
            <div className="p-6 border-b border-divider">
              <h3 className="text-lg font-semibold text-foreground">Pending Bets (Sorted by Fade Confidence)</h3>
            </div>
            <div className="p-6 space-y-4">
              {mockPendingBets.map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-hover-bg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-foreground">{bet.bettor}</span>
                      <Badge 
                        variant={bet.fadeConfidence >= 90 ? "destructive" : bet.fadeConfidence >= 80 ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {bet.fadeConfidence}% fade confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-stat-small">{bet.game} • {bet.bet}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{bet.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}