"use client";
import React, { useState } from "react";
import ProjectDetailsPageHeader from "./PageHeader";
import StatusCard from "./StatusCard";
import BudgetOverview from "./BudgetOverview";
import TimeEntries from "./TimeEntries";
import Invoices from "./Invoices";
import EditProjectForm from "./EditProjectForm";
import { useUpdateProjectMutation } from "@/store/api/endpoints/projects";
import TaskList from "./TaskList";
import UnRoutedmodal from "@/components/utils/UnRoutedDialog";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/utils/toast";
import TaskForm from "./TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  useGetProjectQuery,
  useDeleteProjectMutation, // 👈 you should have this in your RTK endpoints
} from "@/store/api/endpoints/projects";
import { ApiError } from "@/types/apiError";

const ProjectDetailWrapper = ({ id }: { id: string }) => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode.mode);
  const router = useRouter();
  const { data, isLoading, isSuccess, refetch } = useGetProjectQuery({ id });

  // Project Dialogs
  const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
  const [editProjectInfoDialog, setEditProjectInfoDialog] = useState(false);
  const [createTaskDialogIsopen, setCreateTaskDialogIsopen] = useState(false);

  // Delete dialog state
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteProjectReq, { isLoading: deleteLoading }] =
    useDeleteProjectMutation();

  const deleteInputIsValid = () => deleteInput === data?.project.name;

  // Edit Project Form State
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    budget: undefined as number | undefined,
    status: "PLANNED",
  });

  const handleProjectFormChange = (
    field: keyof typeof projectForm,
    value: string | number | undefined
  ) => {
    setProjectForm((prev) => ({ ...prev, [field]: value }));
  };

  const [updateProjectReq, { isLoading: updateLoading }] =
    useUpdateProjectMutation();

  const handleUpdateProject = async () => {
    try {
      await updateProjectReq({ id, ...projectForm }).unwrap();
      toast.success("Project updated successfully!", themeMode);
      setEditProjectInfoDialog(false);
      refetch();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message ?? "Failed to update project", themeMode);
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteInputIsValid()) return;
    try {
      await deleteProjectReq(id).unwrap();
      toast.success("Project deleted successfully", themeMode);
      setDeleteInput("");
      setDeleteProjectDialog(false);
      router.push("/dashboard/projects");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message ?? "Failed to delete project", themeMode);
    }
  };

  // Task creation
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assigneeId: "",
    estimateMins: undefined as number | undefined,
  });

  const handleTaskFormChange = (
    field: string,
    value: string | number | undefined
  ) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = async () => {
    try {
      console.log("Creating task:", { projectId: id, ...taskForm });
      toast.success("Task created successfully!", themeMode);
      setCreateTaskDialogIsopen(false);
      setTaskForm({
        title: "",
        description: "",
        assigneeId: "",
        estimateMins: undefined,
      });
      await refetch();
    } catch (error) {
      toast.error("Failed to create task", themeMode);
    }
  };

  // Mock assignees for TaskForm
  const mockAssignees = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "David Kim" },
    { id: "3", name: "Sophie Tran" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-6">
      {isSuccess && !isLoading && data !== undefined && (
        <div className="space-y-4">
          <ProjectDetailsPageHeader
            setDeleteProjectdialog={() => {
              setDeleteProjectDialog((v) => !v);
            }}
            setEditProjectInfoDialog={() => {
              if (data?.project) {
                setProjectForm({
                  name: data.project.name,
                  description: data.project.description ?? "",
                  budget: data.project.budget ?? undefined,
                  status: data.project.status ?? "PLANNED",
                });
              }
              setEditProjectInfoDialog((v) => !v);
            }}
            name={data.project.name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <StatusCard status={data.project.status} />
              {/* <TeamMembers /> */}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <BudgetOverview />

              <TaskList
                setIsOpen={() => {
                  setCreateTaskDialogIsopen(true);
                }}
              />
              <TimeEntries />
              <Invoices />
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="h-[70vh] flex justify-center items-center">
          <Spinner className="w-12 h-12 text-muted-foreground" />
        </div>
      )}

      {/* 🧩 Create Task Modal */}
      <UnRoutedmodal
        isOpen={createTaskDialogIsopen}
        setIsOpen={() => setCreateTaskDialogIsopen((v) => !v)}
      >
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          values={taskForm}
          onChange={handleTaskFormChange}
          assignees={mockAssignees}
        />

        <div className="flex justify-end mt-4 space-x-3">
          <Button
            variant="outline"
            onClick={() => setCreateTaskDialogIsopen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </div>
      </UnRoutedmodal>

      {/* 🧨 Delete Project Modal */}
      <UnRoutedmodal
        isOpen={deleteProjectDialog}
        setIsOpen={() => setDeleteProjectDialog((v) => !v)}
      >
        <DialogHeader>
          <DialogTitle className="text-tag-text-error uppercase">
            DELETE {data?.project.name}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to{" "}
            <span className="text-tag-text-error">DELETE</span> this project?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            Enter "
            <span className="text-tag-text-error">{data?.project.name}</span>"
            to confirm deletion.
          </p>
          <Input
            type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-between mt-4">
          <div />
          <div className="space-x-3">
            <Button
              onClick={() => {
                setDeleteInput("");
                setDeleteProjectDialog(false);
              }}
              className="bg-card hover:bg-surface-2 text-foreground"
            >
              Cancel
            </Button>
            <Button
              variant={
                deleteInputIsValid() || deleteLoading ? "default" : "outline"
              }
              disabled={!deleteInputIsValid() || deleteLoading}
              onClick={handleDeleteProject}
              className="bg-tag-bg-error text-tag-text-error hover:underline hover:bg-tag-bg-error"
            >
              {deleteLoading && <Spinner />} Delete
            </Button>
          </div>
        </div>
      </UnRoutedmodal>

      {/* ✏️ Edit Project Modal */}
      <UnRoutedmodal
        isOpen={editProjectInfoDialog}
        setIsOpen={() => setEditProjectInfoDialog((v) => !v)}
      >
        <DialogHeader>
          <DialogTitle>Edit Project Info</DialogTitle>
        </DialogHeader>

        <EditProjectForm
          values={projectForm}
          onChange={handleProjectFormChange}
        />

        <div className="flex justify-end mt-4 space-x-3">
          <Button
            variant="outline"
            onClick={() => setEditProjectInfoDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} disabled={updateLoading}>
            {updateLoading && <Spinner />} Update
          </Button>
        </div>
      </UnRoutedmodal>
    </div>
  );
};

export default ProjectDetailWrapper;
