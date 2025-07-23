
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, TrendingDown, Info } from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  description: string;
  metric?: string;
  action?: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "High Churn Rate",
    description: "Monthly churn rate has increased to 2.3%",
    metric: "+0.8%",
    action: "View Details"
  },
  {
    id: "2",
    type: "success",
    title: "Growth Target Met",
    description: "New user signups exceeded monthly goal",
    metric: "156 users",
    action: "View Report"
  },
  {
    id: "3",
    type: "info",
    title: "Payment Processing",
    description: "Monthly billing cycle starting tomorrow",
    action: "Prepare"
  }
];

export function AlertCards() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "success":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "warning":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Warning</Badge>;
      case "error":
        return <Badge variant="outline" className="text-red-600 border-red-200">Error</Badge>;
      case "success":
        return <Badge variant="outline" className="text-green-600 border-green-200">Success</Badge>;
      case "info":
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Info</Badge>;
      default:
        return null;
    }
  };

  if (mockAlerts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Alerts & Notifications</h3>
      <div className="grid gap-4">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className="p-4 bg-section-bg border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                  {getAlertBadge(alert.type)}
                </div>
                <p className="text-sm text-stat-small mb-2">{alert.description}</p>
                {alert.metric && (
                  <p className="text-sm font-medium text-foreground mb-2">{alert.metric}</p>
                )}
                {alert.action && (
                  <Button variant="outline" size="sm" className="text-xs">
                    {alert.action}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
