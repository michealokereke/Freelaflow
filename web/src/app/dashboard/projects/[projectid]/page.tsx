// import ClientDatailsError from "@/components/clients/ClientDetails/ClientDatailsError";
// import BudgetOverview from "@/components/projects/ProjectDetails/BudgetOverview";
// import Invoices from "@/components/projects/ProjectDetails/Invoices";
// import ProjectDetailsPageHeader from "@/components/projects/ProjectDetails/PageHeader";
// import StatusCard from "@/components/projects/ProjectDetails/StatusCard";
// import TaskList from "@/components/projects/ProjectDetails/TaskList";
// import TeamMembers from "@/components/projects/ProjectDetails/TeamMembers";
// import TimeEntries from "@/components/projects/ProjectDetails/TimeEntries";
// import { useGetClientQuery } from "@/store/api/endpoints/clients";
import ProjectDetailWrapper from "@/components/projects/ProjectDetails/ProjectDetailWrapper";

import React from "react";

const ProjectDetailPage = async ({
  params,
}: {
  params: { projectid: string };
}) => {
  const { projectid } = await params;

  return (
    <div>
      <ProjectDetailWrapper id={projectid} />
    </div>
  );
};

export default ProjectDetailPage;
