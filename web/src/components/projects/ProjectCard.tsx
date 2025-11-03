import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { GetProjectsT } from "@/types/projectsReqT";
import Link from "next/link";

const ProjectCard: React.FC<{ project: GetProjectsT }> = ({ project }) => {
  return (
    <Link
      className="min-w-72 max-w-sm"
      href={`/dashboard/projects/${project.id}`}
    >
      <Card className="hover:bg-surface-3 p-4 min-w-72 max-w-sm flex-1 transition-all duration-300 hover:shadow-shadow-strong hover:shadow flex flex-col gap-3">
        <CardHeader className="p-0">
          <CardTitle>{project.name}</CardTitle>
          <CardDescription className="text-xs truncate">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 p-0 w-full">
          <div className="w-full flex justify-between items-end gap-4">
            <p className=" text-xs font-semibold ">Status: {project.status}</p>
            <p className=" text-xs font-semibold ">
              Budget: ${project.budgetCents}
            </p>
            <Button>
              <ExternalLink />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
