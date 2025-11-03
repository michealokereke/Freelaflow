import { api } from "../api";

interface AuthTypes {
  Login: {
    email: string;
    password: string;
  };
  Register: {
    email: string;
    password: string;
    orgName: string;
    fullName: string;
  };
}

const authUrl = "/v1/auth";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, AuthTypes["Login"]>({
      query: (credentials) => ({
        url: `${authUrl}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<unknown, AuthTypes["Register"]>({
      query: (credentials) => ({
        url: `${authUrl}/register`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${authUrl}/logout`,
        method: "POST",
      }),
    }),

    me: builder.query({
      query: () => `${authUrl}/me`,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useMeQuery,
} = authApi;
