"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectsQuery } from "@/store/api/endpoints/projects";
import { Ban, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Projects: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isSuccess, isError } = useGetProjectsQuery({
    clientId: id,
  });

  console.log(data);
  const projects = [
    {
      id: "proj-001",
      name: "Website Redesign",
      status: "in-progress",
      amount: 12500,
    },
    {
      id: "proj-002",
      name: "Mobile App Development",
      status: "completed",
      amount: 32750,
    },
  ];

  return (
    <div>
      {!isLoading && isError && (
        <Card className="p-10 flex flex-cols gap-4 items-center justify-center text-tag-text-error bg-tag-bg-error">
          <div>
            <Ban size={44} />
          </div>

          <div className="flex justify-center items-center flex-col">
            <p>There was an Error while lodaing projects</p>
            <p className="font-semibold hover:text-link-hover text-link  ">
              {" "}
              Refetch Projects{" "}
            </p>
          </div>
        </Card>
      )}

      {isLoading && (
        <Card className="p-10 flex flex-cols gap-4 items-center justify-center ">
          <Spinner className="w-15 h-15" />
        </Card>
      )}

      {!isLoading && data?.projects !== undefined && !isError && isSuccess && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <Link href={`/dashboard/projects/new/${id}`}>
              <Button size="sm">
                <Plus />
              </Button>
            </Link>
          </div>

          {data?.projects.length === 0 && (
            <Card className="flex flex-cols bg-surface-2 gap-4 items-center justify-center ">
              <div className="text-muted-foreground">
                <Ban size={44} />
              </div>

              <div className="flex justify-center items-center flex-col">
                <p className="font-semibold">You have no Projects </p>
              </div>
            </Card>
          )}

          {data?.projects.length !== 0 && (
            <div className="space-y-3">
              {data.projects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`dashboard/projects/${project.id}`}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      $
                      {project.budgetCents
                        ? project.budgetCents.toLocaleString()
                        : "nill"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "COMPLETED"
                        ? "text-tag-text-success bg-tag-bg-success"
                        : project.status === "ARCHIVED"
                        ? "text-tag-text-warning bg-tag-bg-warning"
                        : "text-tag-text-info bg-tag-bg-info"
                    }`}
                  >
                    {project.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default Projects;
