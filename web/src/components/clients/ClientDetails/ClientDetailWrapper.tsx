"use client";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  useDeleteclientMutation,
  useGetClientQuery,
  useUpdateclientMutation,
} from "@/store/api/endpoints/clients";
import React, { useState } from "react";
import ClientDetailsPageHeader from "./PageHeader";
import ClientInfo from "./ClientInfo";
import StatusCard from "./StatusCard";
import FinanceStats from "./FinanceStats";
import Projects from "./Projects";
import RecentInvoices from "./RecentInvoices";
import ClientDatailsError from "./ClientDatailsError";
import UnRoutedmodal from "@/components/utils/UnRoutedDialog";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/utils/toast";
import { ApiError } from "@/types/apiError";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import UpdataeClient from "./UpdataeClient";
import ErrorStateCard from "@/components/utils/ErrorStatsCard";

const ClientDetailWrapper: React.FC<{ id: string }> = ({ id }) => {
  const themeMode = useSelector((store: RootState) => store.ui.themeMode.mode);
  const { data, isLoading, isError, isSuccess, refetch } = useGetClientQuery({
    id,
  });
  const [updateClientReq, { isLoading: updateIsLoading, data: updateData }] =
    useUpdateclientMutation();
  const [editUserInfoDialog, setEditUserInfoDialog] = useState(false);
  const [deleteUserdialog, setDeleteUserdialog] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [
    deleteClientReq,
    { data: deleteClientData, isLoading: deleteclientIsLoading },
  ] = useDeleteclientMutation();
  const router = useRouter();

  const deleteInputIsValid = () => deleteInput === data?.client.name;

  const handleUpdateClientInfo = async (payload: {
    email?: string;
    name: string;
    address?: string;
    phone?: string;
    id: string;
  }) => {
    try {
      const data = await updateClientReq(payload).unwrap();
      toast.success(data.message, themeMode);
      setEditUserInfoDialog(false);
      await refetch();
    } catch (error) {
      const err = error as ApiError;
      console.log(error);
      toast.error(
        err?.data?.message ?? "An unexpected error occurred",
        themeMode
      );
    }
  };

  const handleDeleteClient = async () => {
    if (!deleteInputIsValid()) return;
    try {
      const res = await deleteClientReq(id).unwrap();
      toast.success("client deleted successfully", themeMode);
      setDeleteInput("");
      setDeleteUserdialog(false);
      router.push("/dashboard/clients");
    } catch (error) {
      const err = error as ApiError;

      toast.error("error occured while deleting client", themeMode);

      console.log(error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto  pb-6">
      {isSuccess && !isLoading && data.client !== undefined && (
        <div className="space-y-4">
          {" "}
          <ClientDetailsPageHeader
            name={data.client.name}
            setDeleteUserdialog={() => {
              setDeleteUserdialog((value) => !value);
            }}
            setEditUserInfoDialog={() => {
              setEditUserInfoDialog((value) => !value);
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="lg:col-span-1 space-y-6">
              <ClientInfo clientInfo={data.client} />
              <StatusCard createdAt={data.client.createdAt} />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <FinanceStats />
              <Projects id={id} />
              <RecentInvoices />
            </div>
          </div>
          <UnRoutedmodal
            isOpen={editUserInfoDialog}
            setIsOpen={() => {
              setEditUserInfoDialog((value) => !value);
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit user Info</DialogTitle>
            </DialogHeader>

            <UpdataeClient
              isLoading={updateIsLoading}
              UpdateClientInfo={async (payload: {
                email?: string;
                name: string;
                address?: string;
                phone?: string;
                id: string;
              }) => {
                await handleUpdateClientInfo(payload);
              }}
              prevClientData={data.client}
            />
          </UnRoutedmodal>
          {/*  */}
          <UnRoutedmodal
            isOpen={deleteUserdialog}
            setIsOpen={() => {
              setDeleteUserdialog((value) => !value);
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-tag-text-error uppercase">
                DELETE {data?.client.name}
              </DialogTitle>
              <DialogDescription>
                {" "}
                Are you sure you want to{" "}
                <span className="text-tag-text-error">DELETE</span> this user?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1">
              {" "}
              <p>
                Enter "
                <span className="text-tag-text-error">{data.client.name}</span>"
                to delete client.
              </p>
              <Input
                type="text"
                value={deleteInput}
                onChange={(e) => {
                  setDeleteInput(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-between items-between">
              <div />

              <div className="space-x-3">
                <Button
                  onClick={() => {
                    setDeleteInput("");
                    setDeleteUserdialog(false);
                  }}
                  className={`bg-card hover:bg-surface-2 text-foreground`}
                >
                  cancel
                </Button>
                <Button
                  variant={
                    deleteInputIsValid() || deleteclientIsLoading
                      ? "default"
                      : "outline"
                  }
                  disabled={!deleteInputIsValid()}
                  onClick={(e) => {
                    handleDeleteClient();
                  }}
                  className="bg-tag-bg-error text-tag-text-error hover:underline hover:bg-tag-bg-error"
                >
                  {deleteclientIsLoading && <Spinner />} Delete
                </Button>
              </div>
            </div>
          </UnRoutedmodal>
        </div>
      )}

      {!isLoading && isError && (
        <div>
          <ErrorStateCard
            backHref="/dashboard/clients"
            backText="Back to Client"
          />
        </div>
      )}

      {isLoading && (
        <div className="h-[70vh] flex justify-center items-center">
          <Card className="p-20 bg-background border-none max-w-160 flex-1 flex justify-center items-center">
            <Spinner
              className="w-32 h-32 text-muted-foreground"
              strokeWidth={0.5}
            />
          </Card>
        </div>
      )}

      {/* <UnRoutedmodal
        isOpen={createTaskDialogIsopen}
        setIsOpen={() => {
          setCreateTaskDialogIsopen((value) => !value);
        }}
      >
        <DialogHeader>
          <DialogTitle>unrouted</DialogTitle>
        </DialogHeader>
      </UnRoutedmodal> */}
    </div>
  );
};

export default ClientDetailWrapper;
