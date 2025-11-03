"use client";

import React, { useEffect, useState } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useCreateClientMutation } from "@/store/api/endpoints/clients";
import { toast } from "@/utils/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ApiError } from "@/types/apiError";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export const ClientForm = () => {
  const themeMode = useSelector((store: RootState) => store.ui.themeMode.mode);
  const [clientData, setClienData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const router = useRouter();
  const [createClientReq, { isLoading, isError, data, isSuccess }] =
    useCreateClientMutation();

  const isValid = () =>
    clientData.name.trim() !== "" && /\S+@\S+\.\S+/.test(clientData.email);

  const updateField = (key: keyof typeof clientData, value: string) => {
    setClienData((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!isValid()) return;
    try {
      const data = await createClientReq(clientData).unwrap();
      toast.success(data.message);
      return router.push("/dashboard/clients");
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err?.data?.message ?? "An unexpected error occurred",
        themeMode
      );
    }
  };

  return (
    <div className="h-[100vh] flex  justify-center items-center">
      <Card className="flex-1 sm:max-w-160">
        <CardHeader className="text-center">
          {" "}
          <CardTitle>Create new client</CardTitle>
          <CardDescription>
            {" "}
            create a new cliemt and start addimg Projects and tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => {
                    updateField("name", e.target.value);
                  }}
                  className="border-border"
                  id="name"
                  name="name"
                  placeholder="John doe"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => {
                    updateField("email", e.target.value);
                  }}
                  className="border-border"
                  id="email"
                  name="email"
                  placeholder="name@gmail.com"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">phone Number</Label>
                <Input
                  onChange={(e) => {
                    updateField("phone", e.target.value);
                  }}
                  className="border-border"
                  id="phone"
                  name="phone"
                  placeholder="--- ---- ---"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Address</Label>
                <Input
                  onChange={(e) => {
                    updateField("address", e.target.value);
                  }}
                  className="border-border"
                  id="address"
                  name="addredd"
                  placeholder="No,1 VI street, Virginia, US"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div />{" "}
              <Button
                className=""
                type="submit"
                variant={!isLoading && isValid() ? "default" : "outline"}
                disabled={!isValid() || isLoading}
              >
                {isLoading && <Spinner />} Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const ClientFormDialog = () => {
  const themeMode = useSelector((store: RootState) => store.ui.themeMode.mode);
  const [clientData, setClienData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const router = useRouter();

  const [createClientReq, { isLoading, isError, data, isSuccess }] =
    useCreateClientMutation();

  const isValid = () =>
    clientData.name.trim() !== "" && /\S+@\S+\.\S+/.test(clientData.email);

  const updateField = (key: keyof typeof clientData, value: string) => {
    setClienData((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!isValid()) return;
    try {
      const data = await createClientReq(clientData).unwrap();
      toast.success(data.message);
      await router.back();
      await router.refresh();
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err?.data?.message ?? "An unexpected error occurred",
        themeMode
      );
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Create new client</DialogTitle>
        <DialogDescription>
          create a new cliemt and start addimg Projects and tasks
        </DialogDescription>
      </DialogHeader>
      <form
        className="mt-6"
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={(e) => {
                updateField("name", e.target.value);
              }}
              className="border-border"
              value={clientData.name}
              id="name"
              name="name"
              placeholder="John doe"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => {
                updateField("email", e.target.value);
              }}
              className="border-border"
              value={clientData.email}
              id="email"
              name="email"
              placeholder="name@gmail.com"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">phone Number</Label>
            <Input
              onChange={(e) => {
                updateField("phone", e.target.value);
              }}
              className="border-border"
              value={clientData.phone}
              id="phone"
              name="phone"
              placeholder="--- ---- ---"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Address</Label>
            <Input
              onChange={(e) => {
                updateField("address", e.target.value);
              }}
              className="border-border"
              value={clientData.address}
              id="address"
              name="addredd"
              placeholder="No,1 VI street, Virginia, US"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            variant={!isLoading && isValid() ? "default" : "outline"}
            disabled={!isValid() || isLoading}
          >
            {isLoading && <Spinner />} Create
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};
