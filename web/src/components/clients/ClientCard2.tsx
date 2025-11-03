import React from "react";
import { Card } from "../ui/card";
import { Calendar, UserRound } from "lucide-react";
import { GetclientT } from "@/types/clientReqT";
import Link from "next/link";

const ClientCard2: React.FC<{ client: GetclientT }> = ({ client }) => {
  return (
    <Link href={`/dashboard/clients/${client.id}`}>
      <Card className=" p-6 hover:shadow-md transition-shadow cursor-pointer hover:bg-muted">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className=" text-tag-text-info bg-tag-bg-info p-4 rounded-lg">
              <UserRound />
            </div>

            <div>
              <h3 className="font-semibold">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Projects</span>
            <span className="font-semibold">
              {client._count.projects.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Revenue</span>
            <span className="font-semibold text-tag-text-success">$17,400</span>
          </div>
          <div className="pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar size={18} />
              <span>
                Since {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ClientCard2;
