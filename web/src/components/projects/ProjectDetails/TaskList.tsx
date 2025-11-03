import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  setIsOpen: () => void;
}

const TaskList = ({ setIsOpen }: Props) => {
  const tasks = [
    { id: "task-001", name: "Design mockups", status: "completed", hours: 40 },
    {
      id: "task-002",
      name: "Frontend development",
      status: "in-progress",
      hours: 60,
    },
    {
      id: "task-003",
      name: "Backend integration",
      status: "pending",
      hours: 30,
    },
    { id: "task-004", name: "Testing & QA", status: "pending", hours: 20 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button onClick={() => setIsOpen()} size="sm">
          <Plus />
        </Button>
      </div>
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
                checked={task.status === "completed"}
                readOnly
              />
              <div>
                <p
                  className={`font-medium ${
                    task.status === "completed"
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {task.hours}h estimated
                </p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "completed"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaskList;
