import { Card } from "@/components/ui/card";
import React from "react";

interface Props {
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
}
const StatusCard = ({ status }: Props) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Status</h2>
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            status === "ACTIVE"
              ? "bg-tag-bg-info"
              : status === "COMPLETED"
              ? "bg-tag-bg-success"
              : "bg-tag-bg-warning"
          } bg-blue-500`}
        ></div>
        <span className="capitalize text-foreground font-medium">{status}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">20%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `70%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
