import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { GetclientT } from "@/types/clientReqT";
import Link from "next/link";

const ClientCard: React.FC<{ client: GetclientT }> = ({ client }) => {
  return (
    <Link
      href={`/dashboard/clients/${client.id}`}
      className="max-w-md min-w-86 flex-1"
    >
      {" "}
      <Card className="hover:bg-surface-3 flex-1 transition-all duration-300 hover:shadow-shadow-strong hover:shadow">
        <CardHeader>
          <CardTitle>{client.name}</CardTitle>
          <CardDescription className="truncate">{client.email}</CardDescription>
          <CardAction>
            <Button>View details</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex gap-3">
          <p className="font-semibold">
            Projects: <span className="text-lg text-secondary">53</span>
          </p>
          <p className="font-semibold">
            Outstanding Invoice: <span className="text-lg text-link">53</span>
          </p>

          {/*           
          <Card className="p-2 rounded-m w-24 bg-surface-2">
            <CardTitle className="text-center">Projects</CardTitle>
            <CardContent className="text-center font-bold text-2xl">
              54
            </CardContent>
          </Card>

          <Card className="p-2 rounded-m w-44 bg-surface-2">
            <CardTitle className="text-center truncate">
              Outstanding Incoice
            </CardTitle>
            <CardContent className="text-2xl text-center font-bold">
              54
            </CardContent>
          </Card> */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClientCard;
