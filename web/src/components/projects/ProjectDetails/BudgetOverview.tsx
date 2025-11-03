import { Card } from "@/components/ui/card";
import React from "react";

const BudgetOverview = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground mb-1">Budget</p>
        <p className="text-2xl font-bold text-foreground">$38,500</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground mb-1">Spent</p>
        <p className="text-2xl font-bold text-orange-600">$38,500</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-muted-foreground mb-1">Remaining</p>
        <p className="text-2xl font-bold text-green-600">$38,500</p>
      </Card>
    </div>
  );
};

export default BudgetOverview;
