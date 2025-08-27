
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

const fadedBettors: BetterStat[] = [];
const coldStreaks: BetterStat[] = [];
const worstBettors: BetterStat[] = [];
const allPendingBets: PendingBet[] = [];

export function BettingStats() {
  const [activeTab, setActiveTab] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConfidence, setFilterConfidence] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Show only top 3 highest confidence bets in the main view
  const topPendingBets = allPendingBets
    .sort((a, b) => b.fadeConfidence - a.fadeConfidence)
    .slice(0, 3);

  // Filter bets for the dialog view
  const filteredBets = allPendingBets.filter(bet => {
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
              <div className="p-6 border-b border-divider flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Most Faded</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="p-6 space-y-4">
                {fadedBettors.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-stat-small">No data available</p>
                  </div>
                ) : (
                  fadedBettors.map((better, index) => (
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
                  ))
                )}
              </div>
            </Card>

            {/* Coldest Streaks */}
            <Card className="bg-section-bg border-border shadow-sm">
              <div className="p-6 border-b border-divider flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Coldest Streaks</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="p-6 space-y-4">
                {coldStreaks.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-stat-small">No data available</p>
                  </div>
                ) : (
                  coldStreaks.map((better, index) => (
                    <div key={better.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{better.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-destructive">{better.value}</p>
                        <p className="text-xs text-stat-small">{better.metric}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Worst Bettors */}
            <Card className="bg-section-bg border-border shadow-sm">
              <div className="p-6 border-b border-divider flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Worst Performers</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="p-6 space-y-4">
                {worstBettors.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-stat-small">No data available</p>
                  </div>
                ) : (
                  worstBettors.map((better, index) => (
                    <div key={better.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{better.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-destructive">{better.value}</p>
                        <p className="text-xs text-stat-small">{better.metric}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Pending Bets */}
          <Card className="bg-section-bg border-border shadow-sm">
            <div className="p-6 border-b border-divider flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Pending Bets (Sorted by Fade Confidence)</h3>
                <p className="text-sm text-stat-small mt-1">Showing {topPendingBets.length} of {allPendingBets.length} pending bets</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View Entire List
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>All Pending Bets ({allPendingBets.length})</DialogTitle>
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
              {topPendingBets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-stat-small">No pending bets</p>
                </div>
              ) : (
                topPendingBets.map((bet) => (
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
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
