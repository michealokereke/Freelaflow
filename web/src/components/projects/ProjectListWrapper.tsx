"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectSearchInput from "./ProjectSearchInput";
import ProjectList from "./ProjectList";
import AddProjects from "./AddProjects";
import ClientListCard from "./ClientListCard";
import { useGetProjectsQuery } from "@/store/api/endpoints/projects";
import { useGetclientsQuery } from "@/store/api/endpoints/clients";
import { GetclientT } from "@/types/clientReqT";

const ProjectListWrapper = () => {
  const [clientListCardIsOpen, setClientListCardIsOpen] = useState(true);
  const [getProjectsQueryParams, setGetProjectsQueryParams] = useState<{
    q: string;
    clientId: string;
    page: number;
    status: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "";
  }>({
    status: "",
    clientId: "",
    page: 1,
    q: "",
  });

  const [getClientsQueryParams, setGetClientsQueryParams] = useState({
    q: "",
    page: 1,
  });

  const updateProjectsQueryFields = (
    field: keyof typeof getProjectsQueryParams,
    value: string | number
  ) => {
    setGetProjectsQueryParams((data) => ({
      ...data,
      [field]: value,
    }));
  };

  const updateClientsQueryFields = (
    field: keyof typeof getClientsQueryParams,
    value: string | number
  ) => {
    setGetClientsQueryParams((data) => ({
      ...data,
      [field]: value,
    }));
  };

  const { data, isLoading } = useGetProjectsQuery(getProjectsQueryParams);
  const { data: clientsData, isLoading: clientIsLoading } = useGetclientsQuery(
    getClientsQueryParams
  );

  const selectedClient = clientsData?.clients.find(
    (client) => client.id === getProjectsQueryParams.clientId
  );

  return (
    <Card className="bg-transparent border-none mr-4">
      <CardContent className="space-y-6 p-0">
        <div className="flex justify-between items-center">
          <div />
          <AddProjects />
        </div>

        <div className="flex flex-wrap gap-3 items-start justify-center">
          <ClientListCard
            clients={clientsData?.clients}
            isLoading={clientIsLoading}
            onClientSelect={(value: string) => {
              updateProjectsQueryFields("clientId", value);
            }}
            selectedClient={selectedClient}
            isOpen={clientListCardIsOpen}
            toggle={() => {
              setClientListCardIsOpen((data) => !data);
            }}
            query={getClientsQueryParams}
            onQueryChange={(
              field: keyof typeof getClientsQueryParams,
              value: string | number
            ) => {
              console.log(value);
              updateClientsQueryFields(field, value);
            }}
          />
          <ProjectList
            page={getClientsQueryParams.page}
            totalProjects={data?.totalProjects}
            searchQuery={getProjectsQueryParams.q}
            onQueryParamschange={(
              field: "q" | "page",
              value: string | number
            ) => {
              updateProjectsQueryFields(field, value);
            }}
            projects={data?.projects}
            isLoading={isLoading}
            selectedclient={selectedClient}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectListWrapper;
