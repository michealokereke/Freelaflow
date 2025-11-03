import ClientDetailWrapper from "@/components/clients/ClientDetails/ClientDetailWrapper";

import React from "react";

const ClientDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <ClientDetailWrapper id={id} />
    </div>
  );
};

export default ClientDetailsPage;
