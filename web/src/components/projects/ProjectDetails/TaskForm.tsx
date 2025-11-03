import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type TaskFormValues = {
  title: string;
  description?: string;
  assigneeId?: string;
  estimateMins?: number;
};

type TaskFormProps = {
  values: TaskFormValues;
  onChange: (
    field: keyof TaskFormValues,
    value: string | number | undefined
  ) => void;
  assignees?: { id: string; name: string }[];
};

const TaskForm: React.FC<TaskFormProps> = ({
  values,
  onChange,
  assignees = [],
}) => {
  return (
    <div className="space-y-4 py-2">
      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional description"
          value={values.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>

      {/* Assignee */}
      <div className="space-y-1">
        <Label>Assignee</Label>
        <Select
          value={values.assigneeId || ""}
          onValueChange={(value) => onChange("assigneeId", value || undefined)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            {assignees.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Estimate */}
      <div className="space-y-1">
        <Label htmlFor="estimateMins">Estimate (minutes)</Label>
        <Input
          id="estimateMins"
          type="number"
          placeholder="e.g. 60"
          value={values.estimateMins ?? ""}
          onChange={(e) =>
            onChange(
              "estimateMins",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
        />
      </div>
    </div>
  );
};

export default TaskForm;
