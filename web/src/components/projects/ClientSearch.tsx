"use client";

import React, { useState } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Ban, Plus, Search } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useGetclientsQuery } from "@/store/api/endpoints/clients";
import PaginationComponent from "../utils/Pagination";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export const ClientSearch = () => {
  const [clientsQueryParams, setClientQueryParams] = useState({
    q: "",
    page: 1,
  });
  const { data, isLoading } = useGetclientsQuery(clientsQueryParams);
  const loadingTags = new Array(10).fill(null);

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Card className="flex-1 max-w-120 bg-surface-3">
        <CardHeader>
          <CardTitle>Search for client</CardTitle>
          <CardDescription>
            Search for client so as to create project for the client
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex border-border bg-card rounded-md">
            <Input
              value={clientsQueryParams.q}
              onChange={(e) => {
                setClientQueryParams((data) => ({
                  ...data,
                  q: e.target.value,
                }));
              }}
              type="text"
            />{" "}
            <Button className="bg-transparent text-foreground hover:bg-surface-2">
              <Search />
            </Button>
          </div>

          {isLoading && (
            <ScrollArea className="max-h-[300px] pr-6">
              <div className=" grid gap-2">
                {loadingTags.map((client, i) => (
                  <Card key={i} className="p-2 hover:bg-surface-2">
                    <CardHeader className="p-0 gap-1">
                      <CardTitle>
                        <Skeleton className="h-4 w-40 bg-surface-3" />
                      </CardTitle>

                      <CardDescription>
                        <Skeleton className="h-2 w-60 bg-surface-3 " />
                      </CardDescription>
                      <CardAction className="bg-surface-2 rounded-md hover:bg-surface-3 h-full">
                        <Skeleton className="h-full w-8 bg-surface-3" />
                      </CardAction>
                    </CardHeader>
                  </Card>
                ))}
              </div>{" "}
            </ScrollArea>
          )}

          {data?.clients !== undefined &&
            !isLoading &&
            data.clients.length !== 0 && (
              <ScrollArea className="max-h-[300px] pr-6">
                <div className=" grid gap-2">
                  {data.clients.map((client, i) => (
                    <Link key={i} href={`/dashboard/projects/new/${client.id}`}>
                      {" "}
                      <Card className="p-2 hover:bg-surface-2">
                        <CardHeader className="p-0 gap-1">
                          <CardTitle>{client.name}</CardTitle>

                          <CardDescription>{client.email}</CardDescription>
                          <CardAction className="p-2 bg-surface-2 rounded-md hover:bg-surface-3">
                            <Plus />
                          </CardAction>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>{" "}
              </ScrollArea>
            )}

          {(data?.clients === undefined || data.clients.length === 0) &&
            !isLoading && (
              <Card className="flex justify-center p-16 items-center gap-3">
                <div>
                  <Ban className="text-gray-400" size={48} />
                </div>
                <div className="text-center">
                  <p className="text-semibold">No client seen</p>
                  <p className="text-gray-400 ">
                    Enter a valid client name or visit{" "}
                    <Link
                      className="inline text-link hover:underline hover:text-link-hover"
                      href={"/dashboard/clients"}
                    >
                      clients
                    </Link>
                    &nbsp; to create client
                  </p>
                </div>
              </Card>
            )}

          {data?.clients !== undefined &&
            !isLoading &&
            data.clients.length !== 0 &&
            data?.totalClients !== undefined && (
              <PaginationComponent
                page={clientsQueryParams.page}
                totalObjects={data?.totalClients}
                onChange={(value: number) => {
                  setClientQueryParams((data) => ({ ...data, page: value }));
                }}
              />
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export const ClientSearchDialog = () => {
  const [clientsQueryParams, setClientQueryParams] = useState({
    q: "",
    page: 1,
  });
  const { data, isLoading } = useGetclientsQuery(clientsQueryParams);
  const loadingTags = new Array(10).fill(null);
  return (
    <div className="flex flex-col gap-3">
      <DialogHeader>
        <DialogTitle>Search for client</DialogTitle>
        <DialogDescription>
          Search for client so as to create project for the client
        </DialogDescription>
      </DialogHeader>

      <div className="flex border-border bg-card rounded-md">
        <Input
          value={clientsQueryParams.q}
          onChange={(e) => {
            setClientQueryParams((data) => ({ ...data, q: e.target.value }));
          }}
          type="text"
        />{" "}
        <Button className="bg-transparent text-foreground hover:bg-surface-2">
          <Search />
        </Button>
      </div>

      {isLoading && (
        <ScrollArea className="max-h-[300px] pr-6">
          <div className=" grid gap-2">
            {loadingTags.map((client, i) => (
              <Card key={i} className="p-2 hover:bg-surface-2">
                <CardHeader className="p-0 gap-1">
                  <CardTitle>
                    <Skeleton className="h-4 w-40 bg-surface-3" />
                  </CardTitle>

                  <CardDescription>
                    <Skeleton className="h-2 w-60 bg-surface-3 " />
                  </CardDescription>
                  <CardAction className="bg-surface-2 rounded-md hover:bg-surface-3 h-full">
                    <Skeleton className="h-full w-8 bg-surface-3" />
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>{" "}
        </ScrollArea>
      )}

      {data?.clients !== undefined &&
        !isLoading &&
        data.clients.length !== 0 && (
          <ScrollArea className="max-h-[300px] pr-6">
            <div className=" grid gap-2">
              {data.clients.map((client, i) => (
                <Link key={i} href={`/dashboard/projects/new/${client.id}`}>
                  {" "}
                  <Card className="p-2 hover:bg-surface-2">
                    <CardHeader className="p-0 gap-1">
                      <CardTitle>{client.name}</CardTitle>

                      <CardDescription>{client.email}</CardDescription>
                      <CardAction className="p-2 bg-surface-2 rounded-md hover:bg-surface-3">
                        <Plus />
                      </CardAction>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>{" "}
          </ScrollArea>
        )}

      {(data?.clients === undefined || data.clients.length === 0) &&
        !isLoading && (
          <Card className="flex justify-center p-16 items-center gap-3">
            <div>
              <Ban className="text-gray-400" size={48} />
            </div>
            <div className="text-center">
              <p className="text-semibold">No client seen</p>
              <p className="text-gray-400 ">
                Enter a valid client name or visit{" "}
                <Link
                  className="inline text-link hover:underline hover:text-link-hover"
                  href={"/dashboard/clients"}
                >
                  clients
                </Link>
                &nbsp; to create client
              </p>
            </div>
          </Card>
        )}

      {data?.clients !== undefined &&
        !isLoading &&
        data.clients.length !== 0 &&
        data?.totalClients !== undefined && (
          <PaginationComponent
            page={clientsQueryParams.page}
            totalObjects={data?.totalClients}
            onChange={(value: number) => {
              setClientQueryParams((data) => ({ ...data, page: value }));
            }}
          />
        )}

      {/* <Card className="bg-transparent p-0 gap-0">
        <CardContent className="flex-col flex gap-2 p-2">
          <Link href={"/dashboard/projects/new"}>
            {" "}
            <Card className="p-2 hover:bg-surface-2">
              <CardHeader className="p-0 gap-1">
                <CardTitle>Okereke Micheal</CardTitle>

                <CardDescription>okerekenicheal@gmail.com</CardDescription>
                <CardAction className="p-2 bg-surface-2 rounded-md hover:bg-surface-3">
                  <Plus />
                </CardAction>
              </CardHeader>
            </Card>
          </Link>
        </CardContent>
      </Card> */}
    </div>
  );
};
