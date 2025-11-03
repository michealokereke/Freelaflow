import { api } from "../api";
import { GetProjectsT, ProjectDetailT } from "@/types/projectsReqT";

interface QueryParamsT {
  q?: string;
  clientId?: string;
  page?: number;
  status?: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "";
}

interface CreateNewProjectDataT {
  name: string;
  description?: string;
  clientId: string;
  budgetCents?: number;
}

const projectsUrl = "/v1/projects";
const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<
      { message: string; projects: GetProjectsT[]; totalProjects: number },
      QueryParamsT | undefined
    >({
      query: (credentials) =>
        `${projectsUrl}?q=${credentials?.q || ""}&clientId=${
          credentials?.clientId || ""
        }&page=${credentials?.page || ""}&status=${credentials?.status || ""}`,
    }),

    getProject: builder.query<
      { message: string; project: ProjectDetailT },
      { id: string }
    >({
      query: (credentials) => `${projectsUrl}/${credentials.id}`,
    }),

    createNewProject: builder.mutation<
      { message: string; client: [] },
      CreateNewProjectDataT
    >({
      query: (credentials) => ({
        url: `${projectsUrl}`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateProject: builder.mutation<
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
        url: `${projectsUrl}/${credentials.id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
    deleteProject: builder.mutation<{ message: string; client: [] }, string>({
      query: (id) => ({
        url: `${projectsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateNewProjectMutation,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
