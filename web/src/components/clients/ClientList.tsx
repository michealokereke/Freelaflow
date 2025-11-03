import React from "react";
import ClientCard from "./ClientCard";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaginationComponent from "../utils/Pagination";
import { Ban } from "lucide-react";
import { GetclientT } from "@/types/clientReqT";
import ClientCardLoading from "./ClientCardLoading";
import { Spinner } from "../ui/spinner";
import ClientCard2 from "./ClientCard2";

const ClientList: React.FC<{
  page: number;
  isLoading: boolean;
  clients?: GetclientT[];
  totalClients?: number;
  updateField: (field: "page", value: number) => void;
}> = ({ isLoading, clients, totalClients, page, updateField }) => {
  const times = new Array(10).fill(null);

  return (
    <Card className="bg-surface-2">
      <CardHeader>
        <CardTitle>Clients</CardTitle>

        <CardDescription>Here are the list of all your clients</CardDescription>

        <CardAction className=" flex gap-2 items-center">
          {" "}
          <p className="font-semibold text-lg">Total: </p>
          <p className="font-bold text-3xl">
            {isLoading && <Spinner />}
            {!isLoading && totalClients !== undefined && (
              <span>{totalClients}</span>
            )}
            {!isLoading && totalClients === undefined && <span>-- --</span>}
          </p>
        </CardAction>
      </CardHeader>

      {isLoading && (
        <CardContent className="flex flex-wrap gap-2">
          {times.map((_, index) => {
            return <ClientCardLoading key={index} />;
          })}
        </CardContent>
      )}

      {!isLoading && (
        <div>
          {" "}
          {clients !== undefined && clients.length !== 0 ? (
            //  (
            //   <CardContent className="flex flex-wrap gap-2">
            //     {clients.map((client, i) => {
            //       return <ClientCard key={i} client={client} />;
            //     })}
            //   </CardContent>
            // )

            <CardContent className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
              {" "}
              {clients.map((client, i) => {
                return <ClientCard2 key={i} client={client} />;
              })}
            </CardContent>
          ) : (
            <CardContent className="flex justify-center">
              {" "}
              <div className="p-4 flex-1 max-w-192 h-84  rounded-lg bg-surface-3 flex flex-col items-center justify-center">
                <Ban size={68} />
                <p className="capitalize font-semibold mt-5 text-lg">
                  you have no clients Avalilable
                </p>
                <p>Click New client to start creating clients</p>
              </div>
            </CardContent>
          )}
        </div>
      )}

      <CardFooter>
        <PaginationComponent
          page={page}
          totalObjects={totalClients}
          onChange={(value: number) => {
            updateField("page", value);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default ClientList;
