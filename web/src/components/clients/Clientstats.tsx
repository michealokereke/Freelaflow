import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Clientstats = () => {
  return (
    <Card className="p-0 pb-3 gap-10">
      <CardTitle className="p-2 border-b text-2xl">Client Stats</CardTitle>
      <CardContent className="p-0 flex gap-6 flex-wrap items-center justify-center">
        <Card className="p-3 h-28 md:w-56 w-46 gap-0 flex flex-col justify-between items-center">
          <CardTitle className="text-center md:text-lg font-semibold">
            outstanding invoices
          </CardTitle>
          <CardContent className="p-0">
            <p className="text-4xl font-bold">3478</p>
          </CardContent>
        </Card>
        <Card className="p-3 h-28 md:w-56 w-46 gap-0 flex flex-col justify-between items-center">
          <CardTitle className="text-center md:text-lg font-semibold">
            outstanding invoices
          </CardTitle>
          <CardContent className="p-0">
            <p className="text-4xl font-bold">3478</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Clientstats;
