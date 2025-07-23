import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ErrorLog {
  id: string;
  timestamp: string;
  message: string;
  severity: "low" | "medium" | "high";
}

const mockErrorLogs: ErrorLog[] = [
  {
    id: "1",
    timestamp: "2024-01-22 14:30:25",
    message: "API timeout connecting to DraftKings",
    severity: "medium",
  },
  {
    id: "2",
    timestamp: "2024-01-22 13:15:10",
    message: "User authentication failed for premium feature",
    severity: "low",
  },
  {
    id: "3",
    timestamp: "2024-01-22 12:45:33",
    message: "Database connection pool exhausted",
    severity: "high",
  },
  {
    id: "4",
    timestamp: "2024-01-22 11:20:18",
    message: "Stripe webhook validation failed",
    severity: "medium",
  },
];

export function AdminTools() {
  const [announcement, setAnnouncement] = useState("");
  const [pushNotification, setPushNotification] = useState({
    message: "",
    date: "",
    time: "",
  });
  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const { toast } = useToast();

  const handleSaveAnnouncement = () => {
    if (!announcement.trim()) {
      toast({
        title: "Error",
        description: "Please enter an announcement message",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Announcement saved successfully",
    });
    setAnnouncement("");
  };

  const handleSchedulePush = () => {
    if (!pushNotification.message || !pushNotification.date || !pushNotification.time) {
      toast({
        title: "Error",
        description: "Please fill in all notification fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Push notification scheduled successfully",
    });
    setPushNotification({ message: "", date: "", time: "" });
  };

  const handleRefreshTrends = () => {
    toast({
      title: "Success",
      description: "Trends refreshed successfully",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Success",
      description: "CSV export started - check your downloads",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Announcement */}
        <Card className="bg-section-bg border-border shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6 border-b border-divider bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <h3 className="text-lg font-semibold text-foreground">Post Announcement</h3>
            <p className="text-sm text-muted-foreground mt-1">Send announcements to all users</p>
          </div>
          <div className="p-6 space-y-4">
            <Textarea
              placeholder="Enter announcement message..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              rows={4}
              className="hover:border-primary/50 transition-colors"
            />
            <Button onClick={handleSaveAnnouncement} className="w-full hover:scale-105 transition-transform">
              Save Announcement
            </Button>
          </div>
        </Card>

        {/* Push Notification */}
        <Card className="bg-section-bg border-border shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6 border-b border-divider bg-gradient-to-r from-green-50/50 to-emerald-50/50">
            <h3 className="text-lg font-semibold text-foreground">Schedule Push Notification</h3>
            <p className="text-sm text-muted-foreground mt-1">Schedule notifications for users</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="push-message">Message</Label>
              <Textarea
                id="push-message"
                placeholder="Enter push notification message..."
                value={pushNotification.message}
                onChange={(e) =>
                  setPushNotification(prev => ({ ...prev, message: e.target.value }))
                }
                rows={3}
                className="hover:border-primary/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="push-date">Date</Label>
                <Input
                  id="push-date"
                  type="date"
                  value={pushNotification.date}
                  onChange={(e) =>
                    setPushNotification(prev => ({ ...prev, date: e.target.value }))
                  }
                  className="hover:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <Label htmlFor="push-time">Time</Label>
                <Input
                  id="push-time"
                  type="time"
                  value={pushNotification.time}
                  onChange={(e) =>
                    setPushNotification(prev => ({ ...prev, time: e.target.value }))
                  }
                  className="hover:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <Button onClick={handleSchedulePush} className="w-full hover:scale-105 transition-transform">
              Schedule Notification
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-section-bg border-border shadow-sm">
        <div className="p-6 border-b border-divider">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleRefreshTrends} variant="outline">
              Manual Refresh Trends
            </Button>
            <Button onClick={handleExportCSV} variant="outline">
              Export CSV
            </Button>
            <Button
              onClick={() => setShowLoginHistory(!showLoginHistory)}
              variant="outline"
            >
              {showLoginHistory ? "Hide" : "Show"} Login History
            </Button>
          </div>
        </div>
      </Card>

      {/* Error Logs */}
      <Card className="bg-section-bg border-border shadow-sm">
        <div className="p-6 border-b border-divider">
          <h3 className="text-lg font-semibold text-foreground">Error Logs</h3>
        </div>
        <div className="p-6 space-y-3">
          {mockErrorLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-hover-bg transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <Badge variant={getSeverityColor(log.severity)} className="text-xs">
                    {log.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-stat-small">{log.timestamp}</span>
                </div>
                <p className="text-sm text-foreground">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Login History (conditionally shown) */}
      {showLoginHistory && (
        <Card className="bg-section-bg border-border shadow-sm">
          <div className="p-6 border-b border-divider">
            <h3 className="text-lg font-semibold text-foreground">Recent Login History</h3>
          </div>
          <div className="p-6 space-y-3">
            {[
              { email: "john.doe@example.com", timestamp: "2024-01-22 15:30:00", ip: "192.168.1.100" },
              { email: "sarah.smith@example.com", timestamp: "2024-01-22 14:45:12", ip: "10.0.0.50" },
              { email: "mike.johnson@example.com", timestamp: "2024-01-22 13:20:35", ip: "172.16.0.25" },
            ].map((login, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{login.email}</p>
                  <p className="text-xs text-stat-small">{login.timestamp}</p>
                </div>
                <span className="text-xs text-stat-small">{login.ip}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}