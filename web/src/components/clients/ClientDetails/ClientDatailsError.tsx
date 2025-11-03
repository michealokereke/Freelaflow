import { Card } from "@/components/ui/card";
import { ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClientDatailsError = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      {" "}
      <Card className="bg-tag-bg-error flex flex-1 max-w-160 justify-center items-center p-10 text-tag-text-error">
        <div className="">
          {" "}
          <Ban size={120} />
        </div>

        <div>
          <p className="font-semibold text-tag-text-error ">
            There was an Error while getting the client
          </p>
          <Link
            href={"/dashboard/clients"}
            className=" text-muted-foreground flex justify-center items-center gap-2 hover:text-link "
          >
            <span>
              <ArrowLeft size={16} />
            </span>
            <span> Back to clients</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ClientDatailsError;
