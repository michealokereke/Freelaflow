"use client";

import React, { FormEvent, useState } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useGetClientQuery } from "@/store/api/endpoints/clients";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Ban } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { useCreateNewProjectMutation } from "@/store/api/endpoints/projects";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ApiError } from "@/types/apiError";

export const NewProject: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    budgetCents: undefined as number | undefined,
  });
  const [
    createProjectReq,
    { data: createClientData, isLoading: createClientIsLoading },
  ] = useCreateNewProjectMutation();

  const themeMode = useSelector((store: RootState) => store.ui.themeMode.mode);

  const { data, isLoading } = useGetClientQuery({ id });

  const updateFields = (
    field: keyof typeof projectData,
    value: string | number | undefined
  ) => {
    setProjectData((data) => ({ ...data, [field]: value }));
  };

  const isValid = () => projectData.name.trim() !== "";

  const handlCcreateProject = async (e: FormEvent) => {
    if (!isValid()) return;

    try {
      const response = await createProjectReq({
        ...projectData,
        clientId: id,
      });

      toast.success("projects created successfully", themeMode);

      router.push("/dashboard/projects");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data.message, themeMode);
      console.log(error);
    }
  };
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Card className="flex-1 max-w-160">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          {data?.client !== undefined && !isLoading && (
            <CardDescription>
              Create Project for{" "}
              <span className="surface-2 py-0.5 px-1 bg-surface-2 rounded-lg">
                {data.client.name}
              </span>
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {data?.client !== undefined && !isLoading && (
            <form
              action=""
              onSubmit={(e) => handlCcreateProject(e)}
              className="grid gap-3"
            >
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={projectData.name}
                  className="border-border"
                  onChange={(e) => updateFields("name", e.target.value)}
                  id="name"
                  name="name"
                  placeholder="John doe"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  onChange={(e) => updateFields("description", e.target.value)}
                  value={projectData.description}
                  className="border-border"
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="budgetCents">Budget</Label>
                <Input
                  onChange={(e) =>
                    updateFields(
                      "budgetCents",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  value={projectData.budgetCents ?? ""}
                  className="border-border"
                  id="budgetCents"
                  name="budgetCents"
                  placeholder="Enter budget for project"
                />
              </div>

              <div className="flex justify-between gap-2">
                <div />
                <div className=" gap-3 flex">
                  <Button
                    disabled={!isValid() || createClientIsLoading}
                    variant={
                      isValid() || createClientIsLoading ? "default" : "outline"
                    }
                    type="submit"
                  >
                    {createClientIsLoading && <Spinner />} Create
                  </Button>
                </div>
              </div>
            </form>
          )}

          {data?.client === undefined && !isLoading && (
            <Card className="bg-transparent p-0">
              <CardContent className="flex justify-center p-0">
                <div className="p-4 flex-1 max-w-192 h-84  rounded-lg bg-surface-3 flex flex-col items-center justify-center">
                  <Ban size={68} />
                  <p className="capitalize font-semibold mt-5 text-lg">
                    coudn't get the client
                  </p>
                  <p>Select a valid client so as to create projects</p>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card className="bg-transparent p-0">
              <CardContent className="flex justify-center p-16">
                <Spinner className="w-14 h-14" />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const NewProjectDialog: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    budgetCents: undefined as number | undefined,
  });
  const [
    createProjectReq,
    { data: createClientData, isLoading: createClientIsLoading },
  ] = useCreateNewProjectMutation();

  const themeMode = useSelector((store: RootState) => store.ui.themeMode.mode);

  const { data, isLoading } = useGetClientQuery({ id });

  const updateFields = (field: string, value: string | number | undefined) => {
    setProjectData((data) => ({ ...data, [field]: value }));
  };

  const isValid = () => projectData.name.trim() !== "";

  const handlCcreateProject = async (e: FormEvent) => {
    if (!isValid()) return;

    try {
      const response = await createProjectReq({
        ...projectData,
        clientId: id,
      }).unwrap();

      toast.success("projects created successfully", themeMode);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data.message, themeMode);

      console.log(error);

      return;
    } finally {
      router.back();
    }
  };
  return (
    <div className="grid gap-3 ">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        {data?.client !== undefined && !isLoading && (
          <DialogDescription>
            Create Project for{" "}
            <span className="surface-2 py-0.5 px-1 bg-surface-2 rounded-lg">
              {data.client.name}
            </span>
          </DialogDescription>
        )}
      </DialogHeader>

      {data?.client !== undefined && !isLoading && (
        <form
          action=""
          onSubmit={(e) => handlCcreateProject(e)}
          className="grid gap-3"
        >
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              value={projectData.name}
              className="border-border"
              onChange={(e) => updateFields("name", e.target.value)}
              id="name"
              name="name"
              placeholder="John doe"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              onChange={(e) => updateFields("description", e.target.value)}
              value={projectData.description}
              className="border-border"
              id="description"
              name="description"
              placeholder="Enter project description"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="budgetCents">Budget</Label>
            <Input
              type="number"
              onChange={(e) =>
                updateFields(
                  "budgetCents",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              value={projectData.budgetCents ?? ""}
              className="border-border"
              id="budgetCents"
              name="budgetCents"
              placeholder="Enter budget for project"
            />
          </div>

          <div className="flex justify-between gap-2">
            <div />
            <div className=" gap-3 flex">
              {" "}
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button
                disabled={!isValid() || createClientIsLoading}
                variant={
                  isValid() || createClientIsLoading ? "default" : "outline"
                }
                type="submit"
              >
                {createClientIsLoading && <Spinner />} Create
              </Button>
            </div>
          </div>
        </form>
      )}

      {data?.client === undefined && !isLoading && (
        <Card className="bg-transparent p-0">
          <CardContent className="flex justify-center p-0">
            <div className="p-4 flex-1 max-w-192 h-84  rounded-lg bg-surface-3 flex flex-col items-center justify-center">
              <Ban size={68} />
              <p className="capitalize font-semibold mt-5 text-lg">
                coudn't get the client
              </p>
              <p>Select a valid client so as to create projects</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="bg-transparent p-0">
          <CardContent className="flex justify-center p-16">
            <Spinner className="w-14 h-14" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
