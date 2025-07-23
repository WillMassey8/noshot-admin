
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  datePlaced: string;
  sport: string;
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

const mockAllPendingBets: PendingBet[] = [
  { id: "1", bettor: "TailGater99", game: "Lakers vs Warriors", bet: "Lakers +5.5", fadeConfidence: 92, amount: "$500", datePlaced: "2024-01-15 14:30", sport: "NBA" },
  { id: "2", bettor: "SharpShooter", game: "Cowboys vs Eagles", bet: "Over 48.5", fadeConfidence: 87, amount: "$300", datePlaced: "2024-01-15 13:45", sport: "NFL" },
  { id: "3", bettor: "BetKing23", game: "Heat vs Knicks", bet: "Heat ML", fadeConfidence: 84, amount: "$250", datePlaced: "2024-01-15 12:15", sport: "NBA" },
  { id: "4", bettor: "ColdHands", game: "Celtics vs Nets", bet: "Under 215.5", fadeConfidence: 91, amount: "$400", datePlaced: "2024-01-15 11:20", sport: "NBA" },
  { id: "5", bettor: "BadLuck", game: "Chiefs vs Bills", bet: "Chiefs -3.5", fadeConfidence: 89, amount: "$600", datePlaced: "2024-01-15 10:30", sport: "NFL" },
  { id: "6", bettor: "SportsFan88", game: "Rangers vs Bruins", bet: "Rangers ML", fadeConfidence: 76, amount: "$200", datePlaced: "2024-01-15 09:45", sport: "NHL" },
  { id: "7", bettor: "LuckyStreak", game: "Dodgers vs Padres", bet: "Over 8.5", fadeConfidence: 82, amount: "$350", datePlaced: "2024-01-15 08:15", sport: "MLB" },
  { id: "8", bettor: "AlwaysWrong", game: "Bucks vs 76ers", bet: "Bucks -7.5", fadeConfidence: 95, amount: "$450", datePlaced: "2024-01-15 07:30", sport: "NBA" },
  { id: "9", bettor: "MoneyDrain", game: "Packers vs Vikings", bet: "Under 42.5", fadeConfidence: 78, amount: "$275", datePlaced: "2024-01-15 06:45", sport: "NFL" },
  { id: "10", bettor: "Slumping", game: "Clippers vs Suns", bet: "Clippers +2.5", fadeConfidence: 88, amount: "$325", datePlaced: "2024-01-15 05:20", sport: "NBA" },
  { id: "11", bettor: "BadPicks", game: "Lightning vs Panthers", bet: "Lightning ML", fadeConfidence: 73, amount: "$180", datePlaced: "2024-01-15 04:15", sport: "NHL" },
  { id: "12", bettor: "Struggling", game: "Yankees vs Red Sox", bet: "Yankees -1.5", fadeConfidence: 85, amount: "$220", datePlaced: "2024-01-15 03:30", sport: "MLB" },
  { id: "13", bettor: "OffDay", game: "Rams vs Cardinals", bet: "Over 45.5", fadeConfidence: 79, amount: "$290", datePlaced: "2024-01-15 02:45", sport: "NFL" },
  { id: "14", bettor: "LossLeader", game: "Mavs vs Spurs", bet: "Mavs ML", fadeConfidence: 86, amount: "$380", datePlaced: "2024-01-15 01:20", sport: "NBA" },
  { id: "15", bettor: "SinkHole", game: "Oilers vs Flames", bet: "Under 6.5", fadeConfidence: 74, amount: "$160", datePlaced: "2024-01-15 00:15", sport: "NHL" },
  { id: "16", bettor: "TailGater99", game: "Astros vs Angels", bet: "Astros -2.5", fadeConfidence: 83, amount: "$310", datePlaced: "2024-01-14 23:30", sport: "MLB" },
  { id: "17", bettor: "SharpShooter", game: "Titans vs Jaguars", bet: "Titans +4.5", fadeConfidence: 77, amount: "$240", datePlaced: "2024-01-14 22:45", sport: "NFL" },
  { id: "18", bettor: "BetKing23", game: "Hawks vs Magic", bet: "Over 220.5", fadeConfidence: 80, amount: "$195", datePlaced: "2024-01-14 21:15", sport: "NBA" },
];

export function BettingStats() {
  const [activeTab, setActiveTab] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConfidence, setFilterConfidence] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Show only top 3 highest confidence bets in the main view
  const topPendingBets = mockAllPendingBets
    .sort((a, b) => b.fadeConfidence - a.fadeConfidence)
    .slice(0, 3);

  // Filter bets for the dialog view
  const filteredBets = mockAllPendingBets.filter(bet => {
    const matchesSearch = bet.bettor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.bet.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterConfidence === "all" ||
                         (filterConfidence === "high" && bet.fadeConfidence >= 90) ||
                         (filterConfidence === "medium" && bet.fadeConfidence >= 70 && bet.fadeConfidence < 90) ||
                         (filterConfidence === "low" && bet.fadeConfidence < 70);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => b.fadeConfidence - a.fadeConfidence);

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 90) return "destructive";
    if (confidence >= 80) return "secondary";
    return "outline";
  };

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
            <div className="p-6 border-b border-divider flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Pending Bets (Sorted by Fade Confidence)</h3>
                <p className="text-sm text-stat-small mt-1">Showing {topPendingBets.length} of {mockAllPendingBets.length} pending bets</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View Entire List
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>All Pending Bets ({mockAllPendingBets.length})</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search bettors, games, or bets..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filterConfidence} onValueChange={setFilterConfidence}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by confidence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Confidence Levels</SelectItem>
                          <SelectItem value="high">High (90%+)</SelectItem>
                          <SelectItem value="medium">Medium (70-89%)</SelectItem>
                          <SelectItem value="low">Low (&lt;70%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="overflow-auto max-h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Bettor</TableHead>
                            <TableHead>Game</TableHead>
                            <TableHead>Bet</TableHead>
                            <TableHead>Sport</TableHead>
                            <TableHead>Fade Confidence</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date Placed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBets.map((bet) => (
                            <TableRow key={bet.id}>
                              <TableCell className="font-medium">{bet.bettor}</TableCell>
                              <TableCell>{bet.game}</TableCell>
                              <TableCell>{bet.bet}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {bet.sport}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={getConfidenceBadgeVariant(bet.fadeConfidence)}
                                  className="text-xs"
                                >
                                  {bet.fadeConfidence}%
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">{bet.amount}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {new Date(bet.datePlaced).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="p-6 space-y-4">
              {topPendingBets.map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-hover-bg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-foreground">{bet.bettor}</span>
                      <Badge 
                        variant={getConfidenceBadgeVariant(bet.fadeConfidence)}
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
