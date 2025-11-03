"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ClientList from "./ClientList";
import SearchInput from "./SearchInput";
import CreateClient from "./CreateClient";
import { useGetclientsQuery } from "@/store/api/endpoints/clients";

const ClientListWrapper = () => {
  const [queryParams, setQueryParams] = useState({
    q: "",
    page: 1,
    sort: "",
  });

  const { isLoading, isError, isSuccess, data, refetch } = useGetclientsQuery(
    queryParams,
    { refetchOnMountOrArgChange: false }
  );

  const updateFields = (
    key: keyof typeof queryParams,
    value: string | number
  ) => {
    setQueryParams((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const getClients = async () => {
    try {
      const response = await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="bg-transparent border-none pr-4">
      <CardContent className="grid p-0 gap-6">
        <CreateClient />
        <SearchInput
          value={queryParams.q}
          sort={queryParams.sort}
          onChange={(field, fieldValue) => {
            updateFields(field, fieldValue);
          }}
          handleSearch={() => {
            getClients();
          }}
        />
        <ClientList
          isLoading={isLoading}
          clients={data?.clients}
          totalClients={data?.totalClients}
          page={queryParams.page}
          updateField={(key: "page", value: number) => {
            updateFields(key, value);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ClientListWrapper;
