import { NewProjectDialog } from "@/components/projects/NewProject";
import Modal from "@/components/utils/Modal";
import React from "react";

interface NewProjectDynamicPageT {
  params: {
    clientid: string;
  };
}

const NewProjectModal: React.FC<NewProjectDynamicPageT> = async ({
  params,
}) => {
  const { clientid } = await params;

  return (
    <Modal>
      <NewProjectDialog id={clientid} />
    </Modal>
  );
};

export default NewProjectModal;
