import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const RecentInvoices = () => {
  const recentInvoices = [
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
      amount: 8500,
      status: "pending",
      date: "2024-10-20",
    },
    {
      id: "inv-003",
      number: "INV-2024-003",
      amount: 3000,
      status: "overdue",
      date: "2024-09-20",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Invoices</h2>
        <Button size="sm">Create Invoice</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Invoice
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Amount
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Date
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-border hover:bg-muted"
              >
                <td className="py-3 px-3 text-foreground">{invoice.number}</td>
                <td className="py-3 px-3 text-foreground font-medium">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-muted-foreground">
                  {invoice.date}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : invoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentInvoices;
