"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pause, Play, Clock } from "lucide-react";
import React, { useState } from "react";

const TimeEntries = () => {
  const timeEntries: string[] = [];

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

      {timeEntries.length > 0 ? (
        <div className="overflow-x-auto">
          {/* <table className="w-full text-sm border-t border-border">
            <thead>
              <tr className="border-b border-border bg-muted/30">
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
                  className="border-b border-border hover:bg-muted/40 transition-colors"
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
          </table> */}
        </div>
      ) : (
        <CardContent className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground border border-dashed border-border rounded-md mt-4">
          <Clock className="h-6 w-6 mb-2" />
          <p className="font-medium">No time entries yet</p>
          <p className="text-sm">
            Start tracking your work hours to see them here.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default TimeEntries;
