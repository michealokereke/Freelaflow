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
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const ClientCardLoading = () => {
  return (
    <Card className="hover:bg-surface-3 max-w-md min-w-86 flex-1 transition-all duration-300">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-64 bg-surface-3" />
        </CardTitle>
        <CardDescription className="truncate">
          <Skeleton className="h-3 w-56 bg-surface-3" />
        </CardDescription>
        <CardAction>
          <Skeleton className="w-20 bg-surface-3 h-10" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Skeleton className="h-22 w-24 bg-surface-3" />
        <Skeleton className="h-22 w-44 bg-surface-3" />
      </CardContent>
    </Card>
  );
};

export default ClientCardLoading;
