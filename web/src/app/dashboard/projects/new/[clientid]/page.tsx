import { NewProject } from "@/components/projects/NewProject";
import React from "react";

interface NewProjectDynamicPageT {
  params: {
    clientid: string;
  };
}

const CreateNewProjectPage: React.FC<NewProjectDynamicPageT> = async ({
  params,
}) => {
  const { clientid } = await params;
  return (
    <div>
      <NewProject id={clientid} />
    </div>
  );
};

export default CreateNewProjectPage;
