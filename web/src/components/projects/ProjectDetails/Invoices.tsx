import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const Invoices = () => {
  const invoices = [
    {
      id: "inv-001",
      number: "INV-2024-001",
      amount: 5250,
      status: "paid",
      date: "2024-10-15",
    },
    {
      id: "inv-002",
      number: "INV-2024-002",
      amount: 3500,
      status: "pending",
      date: "2024-10-20",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <Button size="sm">Create Invoice</Button>
      </div>
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <div>
              <p className="font-medium text-foreground">{invoice.number}</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium text-foreground">
                ${invoice.amount.toLocaleString()}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  invoice.status === "paid"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {invoice.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Invoices;
