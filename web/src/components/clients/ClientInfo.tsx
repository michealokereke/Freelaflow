"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ClientDetailsT } from "@/types/clientReqT";
import { Spinner } from "../ui/spinner";

const ClientInfo: React.FC<{
  clientDetails: ClientDetailsT;
  updateLoading: boolean;
  deleteLoading: boolean;
  onChange: (field: keyof ClientDetailsT, value: string) => void;
  updateClient: () => void;
  deleteClient: () => void;
}> = ({
  clientDetails,
  onChange,
  updateClient,
  deleteClient,
  updateLoading,
  deleteLoading,
}) => {
  const [clienInfoDisabled, setclientInfodisabled] = useState(true);
  return (
    <Card className="p-0 gap-0 border-none">
      <CardTitle className="border-border border-b p-2 text-2xl">
        Client Information
      </CardTitle>
      <CardContent className="p-2">
        <div className="flex justify-between items-center">
          <div />
          <Pencil
            size={36}
            className="p-2 hover:bg-surface-2 rounded-lg"
            onClick={() => setclientInfodisabled((state) => !state)}
          />
        </div>
        <Card className=" p-2 mt-2 gap-3">
          <CardContent className="p-0 space-y-3">
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="name">Name:</Label>
              <Input
                className="border-border disabled:bg-surface-3! "
                value={clientDetails.name}
                type="text"
                id="name"
                disabled={clienInfoDisabled}
                onChange={(e) => {
                  onChange("name", e.target.value);
                }}
              ></Input>
            </div>

            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email">Email:</Label>
              <Input
                className="border-border disabled:bg-surface-3! "
                id="email"
                type="text"
                value={clientDetails.email}
                onChange={(e) => {
                  onChange("email", e.target.value);
                }}
                disabled={clienInfoDisabled}
              ></Input>
            </div>

            <div className="flex flex-col gap-2 ">
              <Label htmlFor="address">Adress:</Label>
              <Input
                className="border-border disabled:bg-surface-3! "
                id="address"
                type="text"
                value={clientDetails.address}
                onChange={(e) => {
                  onChange("address", e.target.value);
                }}
                disabled={clienInfoDisabled}
              ></Input>
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="phone">Phone:</Label>
              <Input
                className="border-border disabled:bg-surface-3! "
                id="phone"
                type="text"
                value={clientDetails.phone}
                onChange={(e) => {
                  onChange("phone", e.target.value);
                }}
                disabled={clienInfoDisabled}
              ></Input>
            </div>
          </CardContent>{" "}
          {!clienInfoDisabled && (
            <CardFooter className="p-0 flex justify-between items-center">
              <div />
              <div className="flex gap-3">
                <Button
                  className="bg-error-500 hover:bg-red-400"
                  disabled={deleteLoading}
                  onClick={() => {
                    deleteClient();
                  }}
                >
                  {deleteLoading ? <Spinner /> : <Trash2 />}
                </Button>{" "}
                <Button
                  disabled={updateLoading}
                  onClick={() => {
                    updateClient();
                  }}
                >
                  {updateLoading ? <Spinner /> : "save"}
                  *-{" "}
                </Button>{" "}
              </div>
            </CardFooter>
          )}
        </Card>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
