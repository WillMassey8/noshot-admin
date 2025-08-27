
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserMinus, DollarSign, AlertTriangle } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "signup" | "cancellation" | "payment" | "alert";
  user: string;
  action: string;
  time: string;
  amount?: string;
}

const activities: ActivityItem[] = [];

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "cancellation":
        return <UserMinus className="h-4 w-4 text-red-500" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <UserPlus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "signup":
        return <Badge variant="outline" className="text-green-600 border-green-200">New</Badge>;
      case "cancellation":
        return <Badge variant="outline" className="text-red-600 border-red-200">Cancelled</Badge>;
      case "payment":
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Payment</Badge>;
      case "alert":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Alert</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 bg-section-bg border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-stat-small">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover-bg transition-colors">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-muted">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.user}
                  </p>
                  {getActivityBadge(activity.type)}
                </div>
                <p className="text-sm text-stat-small">
                  {activity.action}
                  {activity.amount && (
                    <span className="font-medium text-foreground ml-1">
                      {activity.amount}
                    </span>
                  )}
                </p>
              </div>
              <div className="text-xs text-stat-small">
                {activity.time}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
