import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Ban, Plus } from "lucide-react";

const ClientProjects: React.FC<{ projects?: [] }> = ({ projects }) => {
  return (
    <Card className="p-0 gap-0 border-none">
      <div className="border-border border-b p-2 gap-0 flex justify-between items-center ">
        <CardTitle className="text-lg p-0 ">Projects</CardTitle>
        <div className="hover:bg-surface-2 p-1 rounded-md">
          <Plus />
        </div>
      </div>

      <CardContent className="p-0">
        {/* <Card className="py-4 gap-0 space-y-2 px-2 rounded-none hover:bg-surface-2 border-b border-t-0">
          <div className="flex items-center justify-between">
            {" "}
            <CardTitle>Holy INfo texj</CardTitle>{" "}
            <CardAction> Jokanole Peace</CardAction>
          </div>

          <CardDescription>
            THis project addresse the information about souther pronvice
          </CardDescription>
        </Card> */}

        <div className="p-13">
          <Card className="p-4 bg-surface-3 flex flex-col justify-between items-center gap-3">
            <div className="text-gray-400">
              <Ban size={40} />
            </div>
            <div className="text-center ">
              <p className="font-semibold">
                No project Available for this User
              </p>
              <p className="text-sm text-gray-400">
                Click on the <Plus className="inline" /> above to start creating
                project
              </p>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientProjects;
