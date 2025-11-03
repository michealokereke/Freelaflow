"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pause, Play } from "lucide-react";
import React, { useState } from "react";

const TimeEntries = () => {
  const timeEntries = [
    {
      id: "time-001",
      date: "2024-10-20",
      member: "Sarah Johnson",
      task: "Design mockups",
      hours: 8,
      rate: 75,
    },
    {
      id: "time-002",
      date: "2024-10-20",
      member: "Mike Chen",
      task: "Frontend development",
      hours: 6,
      rate: 85,
    },
    {
      id: "time-003",
      date: "2024-10-19",
      member: "Sarah Johnson",
      task: "Design mockups",
      hours: 4,
      rate: 75,
    },
  ];

  const [timerActive, setTimerActive] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Time Entries</h2>
        <Button
          size="sm"
          variant={timerActive ? "destructive" : "default"}
          onClick={() => setTimerActive(!timerActive)}
          className="gap-2"
        >
          {timerActive ? (
            <>
              <Pause className="w-4 h-4" />
              Stop Timer
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Timer
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Date
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Member
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Task
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Hours
              </th>
              <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-border hover:bg-muted"
              >
                <td className="py-3 px-3 text-foreground">{entry.date}</td>
                <td className="py-3 px-3 text-foreground">{entry.member}</td>
                <td className="py-3 px-3 text-muted-foreground">
                  {entry.task}
                </td>
                <td className="py-3 px-3 text-foreground font-medium">
                  {entry.hours}h
                </td>
                <td className="py-3 px-3 text-foreground font-medium">
                  ${(entry.hours * entry.rate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TimeEntries;
