
import { Card } from "@/components/ui/card";
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

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "signup",
    user: "John Doe",
    action: "signed up for Premium",
    time: "2 min ago",
    amount: "$19.99"
  },
  {
    id: "2",
    type: "cancellation",
    user: "Jane Smith",
    action: "cancelled subscription",
    time: "5 min ago"
  },
  {
    id: "3",
    type: "payment",
    user: "Mike Johnson",
    action: "payment processed",
    time: "12 min ago",
    amount: "$9.99"
  },
  {
    id: "4",
    type: "alert",
    user: "System",
    action: "High churn rate detected",
    time: "15 min ago"
  },
  {
    id: "5",
    type: "signup",
    user: "Sarah Wilson",
    action: "signed up for Basic",
    time: "18 min ago",
    amount: "$9.99"
  }
];

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
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => (
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
        ))}
      </div>
    </Card>
  );
}
