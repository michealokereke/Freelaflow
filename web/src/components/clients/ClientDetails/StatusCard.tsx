import { Card } from "@/components/ui/card";
import React from "react";
import { format, parseISO } from "date-fns";

const StatusCard: React.FC<{ createdAt: Date }> = ({ createdAt }) => {
  const date = format(createdAt, "dd, EEEE, MMMM, yyyy");

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Status</h2>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="capitalize text-foreground font-medium">Active</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">Client since {date} </p>
    </Card>
  );
};

export default StatusCard;
