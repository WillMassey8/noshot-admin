import { BettingStats } from "@/components/BettingStats";

const Betting = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Betting Activity</h1>
        <p className="text-muted-foreground">Monitor betting statistics and user activity</p>
      </div>
      
      <div>
        <BettingStats />
      </div>
    </div>
  );
};

export default Betting;