import { ClientFormDialog } from "@/components/clients/ClientForm";
import Modal from "@/components/utils/Modal";
import React from "react";

const CreateNewClientModal = () => {
  return (
    <Modal>
      <ClientFormDialog />
    </Modal>
  );
};

export default CreateNewClientModal;
