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
import ProjectCard from "./ProjectCard";
import { Ban, Plus } from "lucide-react";
import ProjectSearchInput from "./ProjectSearchInput";
import { GetProjectsT } from "@/types/projectsReqT";
import { GetclientT } from "@/types/clientReqT";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import PaginationComponent from "../utils/Pagination";

const ProjectList: React.FC<{
  page: number;
  totalProjects?: number;
  searchQuery: string;
  onQueryParamschange: (field: "q" | "page", value: string | number) => void;
  projects?: GetProjectsT[];
  isLoading: boolean;
  selectedclient?: GetclientT;
}> = ({
  projects,
  isLoading,
  selectedclient,
  searchQuery,
  onQueryParamschange,
  page,
  totalProjects,
}) => {
  const loadingTags = new Array(10).fill(null);

  return (
    <Card className="min-w-sm flex-1">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Here are the list of the organization projects
        </CardDescription>

        {selectedclient && (
          <CardAction className="p-0 flex">
            <Link
              href={`/dashboard/projects/new/${selectedclient.id}`}
              className="p-2 rounded-md hover:bg-surface-2"
            >
              {" "}
              <Plus />
            </Link>
          </CardAction>
        )}
      </CardHeader>{" "}
      <CardContent className="">
        <ProjectSearchInput
          searchQuery={searchQuery}
          setQuerychange={(value) => {
            onQueryParamschange("q", value);
          }}
          placeholder="search fro projects name or description.."
        />
      </CardContent>
      {isLoading &&
        loadingTags.map((_, i) => (
          <CardContent key={i} className="flex flex-wrap gap-3">
            <Card className="hover:bg-background p-4 min-w-72 max-w-sm flex-1 transition-all duration-300 hover:shadow-shadow-strong hover:shadow flex flex-col gap-3">
              <CardHeader className="p-0">
                <CardTitle>
                  <Skeleton className="h-3 w-40 bg-surface-3" />
                </CardTitle>
                <CardDescription className="text-xs truncate">
                  <Skeleton className="h-2 w-60 bg-surface-3" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3 p-0 w-full">
                <div className="w-full flex justify-between items-end gap-4">
                  <Skeleton className="h-3 w-20 bg-surface-3" />

                  <Skeleton className="h-3 w-20 bg-surface-3" />

                  <div className="p-0">
                    <Skeleton className="h-8 w-8 bg-surface-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        ))}
      {projects !== undefined && projects.length !== 0 && !isLoading && (
        <CardContent className="flex flex-wrap gap-3">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </CardContent>
      )}
      {projects === undefined ||
        (projects?.length === 0 && !isLoading && (
          <CardContent className="flex justify-center items-center">
            <Card className="bg-surface-3 gap-3 p-15 flex justify-center items-center flex-1 max-w-180">
              <div className="text-gray-400">
                <Ban size={48} />
              </div>
              <div className="text-center">
                <p className="font-semibold"> No project avilable</p>{" "}
                <p className="text-sm text-gray-400">
                  {" "}
                  click on the <Plus className="inline" /> abobe to start adding
                  projects
                </p>
              </div>
            </Card>
          </CardContent>
        ))}
      {projects !== undefined && projects.length !== 0 && !isLoading && (
        <PaginationComponent
          page={page}
          totalObjects={totalProjects}
          onChange={(value: number) => {
            onQueryParamschange("page", value);
          }}
        />
      )}
    </Card>
  );
};

export default ProjectList;
