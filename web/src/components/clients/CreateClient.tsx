import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CreateClient = () => {
  return (
    <div className="flex justify-between items-center">
      <div />

      <Link href={"/dashboard/clients/new"}>
        <Button className="bg-secondary text-lg font-semibold hover:bg-secondary-400 shadow shadow-shadow-strong text-secondary-foreground">
          New Client
        </Button>
      </Link>
    </div>
  );
};

export default CreateClient;
