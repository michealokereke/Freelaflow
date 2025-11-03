import { ClientSearchDialog } from "@/components/projects/ClientSearch";
import Modal from "@/components/utils/Modal";
import React from "react";

const ClientSearchModal = () => {
  return (
    <Modal>
      <ClientSearchDialog />
    </Modal>
  );
};

export default ClientSearchModal;
