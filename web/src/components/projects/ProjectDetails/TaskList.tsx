"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ban, Plus } from "lucide-react";
import React from "react";

interface Task {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "REVIEW" | "DONE" | "BLOCKED";
  estimateMins: number;
}

interface Props {
  setIsOpen: () => void;
  tasks: Task[];
}

const TaskList = ({ setIsOpen, tasks }: Props) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button onClick={setIsOpen} size="sm">
          <Plus />
        </Button>
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <Card className="flex flex-cols bg-surface-2 gap-4 items-center justify-center p-10">
          <div className="text-muted-foreground">
            <Ban size={44} />
          </div>
          <div className="flex justify-center items-center flex-col">
            <p className="font-semibold">You have no tasks</p>
            <p className="text-sm text-muted-foreground">
              Create a new task to get started.
            </p>
          </div>
        </Card>
      )}

      {/* Task List */}
      {tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  checked={task.status === "DONE"}
                  readOnly
                />
                <div>
                  <p
                    className={`font-medium ${
                      task.status === "DONE"
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.estimateMins !== undefined && (
                    <p className="text-sm text-muted-foreground">
                      {task.estimateMins / 60}h estimated
                    </p>
                  )}
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.status === "DONE"
                    ? "text-tag-text-success bg-tag-bg-success"
                    : task.status === "IN_PROGRESS"
                    ? "text-tag-text-info bg-tag-bg-info"
                    : "text-tag-text-warning bg-tag-bg-warning"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TaskList;
