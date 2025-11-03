import { ClientDetailsT, GetclientT } from "@/types/clientReqT";
import { api } from "../api";

interface QueryParamsT {
  q?: string;
  sort?: string;
  page?: number;
}

const clienturl = "/v1/clients";
const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getclients: builder.query<
      { message: string; clients: GetclientT[]; totalClients: number },
      QueryParamsT | undefined
    >({
      query: (credentials) =>
        `${clienturl}?q=${credentials?.q}&sort=${credentials?.sort}&page=${credentials?.page}`,
    }),

    getClient: builder.query<
      { message: string; client: ClientDetailsT },
      { id: string } 
    >({
      query: (credentials) => `${clienturl}/${credentials.id}`,
    }),
    createClient: builder.mutation<
      { message: string; client: [] },
      { name: string; email: string }
    >({
      query: (credentials) => ({
        url: `${clienturl}`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateclient: builder.mutation<
      { message: string; client: [] },
      {
        email?: string;
        name: string;
        address?: string;
        phone?: string;
        id: string;
      }
    >({
      query: (credentials) => ({
        url: `${clienturl}/${credentials.id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
    deleteclient: builder.mutation<{ message: string; client: [] }, string>({
      query: (id) => ({
        url: `${clienturl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetclientsQuery,
  useGetClientQuery,
  useUpdateclientMutation,
  useDeleteclientMutation,
} = clientApi;
