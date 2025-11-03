"use client";

import React, { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";

import ClientInfo from "./ClientInfo";
import ClientProjects from "./ClientProjects";
import Clientstats from "./Clientstats";
import {
  useDeleteclientMutation,
  useGetClientQuery,
  useUpdateclientMutation,
} from "@/store/api/endpoints/clients";
import { ClientDetailsT } from "@/types/clientReqT";
import { toast } from "@/utils/toast";
import { ApiError } from "@/types/apiError";
import { useRouter } from "next/navigation";

const DetailsWrapper: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();

  const { data, isLoading } = useGetClientQuery({ id });

  const [updateReq, { isLoading: updateLoading, data: updateData }] =
    useUpdateclientMutation();
  const [deleteReq, { isLoading: deleteLoading, data: deleteData }] =
    useDeleteclientMutation();

  const [clientData, setClientData] = useState<ClientDetailsT>(() => {
    if (data?.client !== undefined) return data.client;

    return {
      id: "",
      organizationId: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  });

  useEffect(() => {
    if (data?.client) {
      setClientData(data.client);
    }
  }, [data]);

  const isValid = () =>
    clientData.name.trim() !== "" && clientData.email?.trim() !== "";

  const updateField = (key: keyof typeof clientData, value: string) => {
    if (clientData !== null) {
      setClientData((data) => ({
        ...data,
        [key]: value,
      }));
    }
  };

  const handleDeleteClient = async () => {
    try {
      const res = await deleteReq(id).unwrap();

      toast.success(res.message);

      router.push("/dashboard/clients");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data.message);
    }
  };

  const handleUpdateClient = async () => {
    if (!isValid) return;

    console.log(clientData);
    try {
      const res = await updateReq({
        name: clientData.name,
        address: clientData.address,
        email: clientData.email,
        phone: clientData.phone,
        id,
      }).unwrap();

      toast.success(res.message);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data.message);
    }
  };

  return (
    <Card className="md:grid grid-cols-2 border-none gap-2 p-0">
      {/* LEFT CARD */}
      <Card className="gap-3 bg-surface-2 p-2">
        <ClientInfo
          clientDetails={clientData}
          onChange={(field: keyof ClientDetailsT, value: string) => {
            updateField(field, value);
          }}
          updateClient={() => {
            handleUpdateClient();
          }}
          deleteClient={() => {
            handleDeleteClient();
          }}
          deleteLoading={deleteLoading}
          updateLoading={updateLoading}
        />
        <ClientProjects />
      </Card>

      {/* RIGHT CARD */}
      <Card className="p-2 gap-3 border-none">
        <Clientstats />
        <Card></Card>
      </Card>
    </Card>
  );
};

export default DetailsWrapper;
