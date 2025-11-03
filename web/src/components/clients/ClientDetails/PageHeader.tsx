import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Edit2, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientDetailsPageHeader: React.FC<{
  name: string;
  setEditUserInfoDialog: () => void;
  setDeleteUserdialog: () => void;
}> = ({ name, setEditUserInfoDialog, setDeleteUserdialog }) => {
  return (
    <Card className="rounded-none">
      <CardHeader className="">
        <CardDescription>
          {" "}
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </Link>{" "}
        </CardDescription>

        <CardTitle className="text-3xl"> {name}</CardTitle>

        <CardAction>
          {" "}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none hover:bg-surface-2 p-1 rounded-md">
              {" "}
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setEditUserInfoDialog()}
                className="hover:bg-muted! hover:text-foreground!"
              >
                <Edit2 className="w-4 h-4" />
                Edit Client
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteUserdialog()}
                className="hover:bg-muted! text-destructive hover:text-destructive!"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
                Delete Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default ClientDetailsPageHeader;
