import React from "react";
import { AdminTools } from "@/components/AdminTools";

const Admin = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Admin Tools</h1>
        <p className="text-muted-foreground">Administrative functions and system management</p>
      </div>
      
      <div>
        <AdminTools />
      </div>
    </div>
  );
};

export default Admin;