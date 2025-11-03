"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface EditProjectFormProps {
  values: {
    name: string;
    description: string;
    budget: number | undefined;
    status: string;
  };
  onChange: (
    field: "name" | "description" | "status" | "budget",
    value: string | number | undefined
  ) => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  values,
  onChange,
}) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter project name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Brief description of the project"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          type="number"
          value={values.budget ?? ""}
          onChange={(e) =>
            onChange(
              "budget",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          placeholder="Enter budget (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          onValueChange={(value) => onChange("status", value)}
          defaultValue={values.status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ARCHIVED">Achive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditProjectForm;
