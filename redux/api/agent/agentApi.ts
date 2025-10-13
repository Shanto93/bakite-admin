import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}` }),
  endpoints: (build) => ({
    getAllAgents: build.query({
      query: () => `/executive/get-executives`,
    }),
  }),
});

export const { useGetAllAgentsQuery } = agentApi;