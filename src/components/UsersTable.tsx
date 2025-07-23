import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  email: string;
  dateJoined: string;
  sportsbookLinked: boolean;
  sportsbookName?: string;
  subscriptionTier: string;
  isActive: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    dateJoined: "2024-01-15",
    sportsbookLinked: true,
    sportsbookName: "DraftKings",
    subscriptionTier: "$19.99",
    isActive: true,
  },
  {
    id: "2",
    email: "sarah.smith@example.com",
    dateJoined: "2024-01-20",
    sportsbookLinked: false,
    subscriptionTier: "$9.99",
    isActive: true,
  },
  {
    id: "3",
    email: "mike.johnson@example.com",
    dateJoined: "2024-01-18",
    sportsbookLinked: true,
    sportsbookName: "FanDuel",
    subscriptionTier: "$19.99",
    isActive: false,
  },
];

export function UsersTable() {
  const [users, setUsers] = useState(mockUsers);

  const toggleUserStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <Card className="bg-section-bg border-border shadow-sm">
      <div className="p-6 border-b border-divider">
        <h3 className="text-lg font-semibold text-foreground">Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Email</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Date Joined</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Sportsbook</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Subscription</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-stat-small">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-divider last:border-0 hover:bg-hover-bg transition-colors"
              >
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-foreground">
                    {user.email}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-stat-small">
                    {new Date(user.dateJoined).toLocaleDateString()}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {user.sportsbookLinked ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {user.sportsbookName}
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-sm text-stat-small">Not linked</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <Badge variant="outline" className="text-xs font-medium">
                    {user.subscriptionTier}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-stat-small">
                      {user.isActive ? "Active" : "Suspended"}
                    </span>
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}