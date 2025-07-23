import React from "react";
import { AdminTools } from "@/components/AdminTools";
import { Settings, Clock } from "lucide-react";

const Admin = () => {
  const getTimeStatus = () => {
    const now = new Date();
    return `Last updated: ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Admin Tools</h1>
              <p className="text-muted-foreground">Administrative functions and system management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {getTimeStatus()}
          </div>
        </div>
      </div>
      
      <div>
        <AdminTools />
      </div>
    </div>
  );
};

export default Admin;