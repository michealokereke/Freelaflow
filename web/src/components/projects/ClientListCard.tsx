import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProjectSearchInput from "./ProjectSearchInput";
import { ArrowDown, ArrowUp, Ban, X } from "lucide-react";
import { GetclientT } from "@/types/clientReqT";
import { Skeleton } from "../ui/skeleton";

const ClientListCard: React.FC<{
  onQueryChange: (field: "q" | "page", value: string | number) => void;
  clients?: GetclientT[];
  isLoading: boolean;
  onClientSelect: (value: string) => void;
  selectedClient?: GetclientT;
  isOpen: boolean;
  toggle: () => void;
  query: { q: string; page: number };
}> = ({
  onQueryChange,
  query,
  clients,
  isLoading,
  onClientSelect,
  selectedClient,
  isOpen,
  toggle,
}) => {
  const loadingTags = new Array(10).fill(null);

  return (
    <Card className="flex-1 min-w-2xs max-w-sm transition-all duration-1000">
      <CardHeader>
        <CardTitle>Client Select</CardTitle>
        <CardDescription className="">
          Select a client to see only all of clients Projects
        </CardDescription>

        <CardContent className="p-0 grid gap-3">
          <ProjectSearchInput
            searchQuery={query.q}
            setQuerychange={(value: string) => {
              onQueryChange("q", value);
            }}
            placeholder="Input your ame or email..."
          />

          {isLoading &&
            loadingTags.map((_, i) => (
              <div
                key={i}
                className="border-border p-2 rounded-lg bg-background"
              >
                <CardHeader className="p-0">
                  {" "}
                  <CardTitle className="text-sm truncate">
                    <Skeleton className="h-3 bg-surface-3 w-40" />
                  </CardTitle>
                  <CardDescription className="text-xs truncate">
                    <Skeleton className="h-2 bg-surface-3 w-60" />
                  </CardDescription>
                </CardHeader>
              </div>
            ))}
          {clients !== undefined &&
            clients.length !== 0 &&
            !isLoading &&
            selectedClient && (
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">Selected Client</p>
                  <div
                    onClick={() => {
                      onClientSelect("");
                    }}
                    className="p-1 rounded-md hover:bg-surface-2"
                  >
                    <X />
                  </div>
                </div>
                <div className="border border-ring p-2 rounded-lg bg-surface-2">
                  <CardTitle className="text-sm truncate">
                    {selectedClient.name}
                  </CardTitle>
                  <CardDescription className="text-xs truncate">
                    {selectedClient.email}
                  </CardDescription>
                </div>
              </div>
            )}

          <div className="flex justify-center items-center ">
            <div
              onClick={() => {
                toggle();
              }}
              className="p-2 rounded-md bg-surface-2 hover:bg-surface-3"
            >
              {" "}
              {isOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </div>

          {clients !== undefined &&
            clients.length !== 0 &&
            !isLoading &&
            isOpen && (
              <div>
                <p className="font-semibold p-1 text-sm">Clients List</p>

                <div className="grid gap-3">
                  {clients.map((client, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        onClientSelect(client.id);
                      }}
                      className="border border-border p-2 rounded-lg hover:bg-surface-2"
                    >
                      <CardTitle className="text-sm truncate">
                        {client.name}
                      </CardTitle>
                      <CardDescription className="text-xs truncate">
                        {client.email}
                      </CardDescription>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {clients === undefined ||
            (clients.length === 0 && !isLoading && isOpen && (
              <div className="flex flex-col gap-3 bg-surface-2 justify-center items-center rounded-lg p-12">
                <div className="text-gray-400">
                  {" "}
                  <Ban size={52} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  {" "}
                  <p className="font-semibold">No client found</p>
                  <p className="text-center text-gray-400">
                    visit clients page to start creating clients and projects
                  </p>
                </div>
              </div>
            ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ClientListCard;
