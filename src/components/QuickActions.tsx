
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Bell, BarChart3, Users, Settings, FileText } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "Export Users", icon: Download, color: "blue" },
    { label: "Send Notification", icon: Bell, color: "green" },
    { label: "View Reports", icon: BarChart3, color: "purple" },
    { label: "User Management", icon: Users, color: "orange" },
    { label: "Settings", icon: Settings, color: "gray" },
    { label: "Documentation", icon: FileText, color: "indigo" },
  ];

  return (
    <Card className="p-6 bg-section-bg border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-hover-bg transition-colors"
          >
            <action.icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-foreground">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
