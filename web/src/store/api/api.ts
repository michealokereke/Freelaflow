import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApi";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Project", "Invoice", "Payment"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
