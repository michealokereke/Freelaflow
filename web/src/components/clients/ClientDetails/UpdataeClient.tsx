import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateclientMutation } from "@/store/api/endpoints/clients";
import { ClientDetailsT } from "@/types/clientReqT";
import React, { useState } from "react";

type Props = {
  UpdateClientInfo: (payload: {
    email?: string;
    name: string;
    address?: string;
    phone?: string;
    id: string;
  }) => Promise<void>;
  isLoading: boolean;
  prevClientData: ClientDetailsT;
};

const UpdataeClient = ({
  isLoading,
  prevClientData,

  UpdateClientInfo,
}: Props) => {
  const [clientData, setClienData] = useState({
    name: prevClientData.name,
    email: prevClientData.email || "",
    phone: prevClientData.phone || "",
    address: prevClientData.address || "",
    id: prevClientData.id,
  });

  const isValid = () => {
    const previousData = {
      name: prevClientData.name,
      email: prevClientData.email || "",
      phone: prevClientData.phone || "",
      address: prevClientData.address || "",
      id: prevClientData.id,
    };

    const validMailAndName =
      clientData.name.trim() !== "" && /\S+@\S+\.\S+/.test(clientData.email);
    const edited = JSON.stringify(clientData) !== JSON.stringify(previousData);
    return validMailAndName && edited;
  };

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

    await UpdateClientInfo(clientData);
  };

  return (
    <div>
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

        <div className="mt-6 flex justify-between items-center ">
          <div />
          <div className="flex gap-4 items-center">
            {" "}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant={!isLoading && isValid() ? "default" : "outline"}
              disabled={!isValid() || isLoading}
            >
              {isLoading && <Spinner />} Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdataeClient;
