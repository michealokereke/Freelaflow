"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";

const Invoices = () => {
  const invoices: string[] = [];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <Button size="sm" className="gap-2">
          <FileText className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {invoices.length > 0 ? (
        <div className="space-y-3">
          {invoices.map((invoice, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* 
              <div>
                <p className="font-medium text-foreground">{invoice.number}</p>
                <p className="text-sm text-muted-foreground">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium text-foreground">
                  ${invoice.amount.toLocaleString()}
                </p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {invoice.status}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <CardContent className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground border border-dashed border-border rounded-md mt-4">
          <FileText className="h-6 w-6 mb-2" />
          <p className="font-medium">No invoices yet</p>
          <p className="text-sm">
            Create your first invoice when ready to bill your client.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default Invoices;
