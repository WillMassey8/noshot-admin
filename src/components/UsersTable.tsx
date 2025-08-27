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

const users: User[] = [];

export function UsersTable() {

  return (
    <Card className="bg-section-bg border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6 border-b border-divider bg-gradient-to-r from-blue-50/50 to-purple-50/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Users</h3>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor user accounts</p>
        </div>
        <Button variant="outline" size="sm">
          View All Users
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-divider">
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Email</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Date Joined</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Sportsbook</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-stat-small">Subscription</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-stat-small">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}