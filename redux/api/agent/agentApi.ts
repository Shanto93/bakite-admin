import type {
  CreateExecutiveArgs,
  CreateExecutiveResponse,
  IApiResponse,
  IDeleteResponse,
  IOnBoarded,
  IUserData,
  ICountResponse,
} from "@/app/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}` }),
  tagTypes: ["Executive", "Consumers", "Shopkeepers"],
  endpoints: (build) => ({
    // Executive Queries

    getAllExecutives: build.query<IUserData[], void>({
      query: () => `/executive/get-all`,
      providesTags: ["Executive"],
      transformResponse: (response: IApiResponse<IUserData[]>) =>
        response.data ?? [],
    }),
    getExecutivesByArea: build.query<
      IUserData[],
      { division: "CTG METRO"; zone: "EAST" | "WEST" | "SOUTH" | "NORTH" }
    >({
      query: ({ division, zone }) =>
        `/executive/by-location?division=${encodeURIComponent(
          division
        )}&zone=${encodeURIComponent(zone)}`,
      providesTags: ["Executive"],
      transformResponse: (response: IApiResponse<IUserData[]>) =>
        response.data ?? [],
    }),

    getExecutiveOnBoardedShops: build.query<IOnBoarded[], { phone: string }>({
      query: ({ phone }) =>
        `/executive/onboarded-shops?phone=${encodeURIComponent(phone)}`,
      transformResponse: (response: IApiResponse<IOnBoarded[]>) =>
        response.data ?? [],
    }),

    deleteExecutive: build.mutation<IDeleteResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/executive/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Executive"],
      transformResponse: (
        response: IApiResponse<{ deletedId?: string }>
      ): IDeleteResponse => ({
        error: response.error,
        message: response.message,
        deletedId: response.data?.deletedId,
      }),
    }),

    updateExecutive: build.mutation<
      IUserData[],
      { id: string; division: string; zone: string }
    >({
      query: ({ id, division, zone }) => ({
        url: `/executive/update/${id}`,
        method: "PATCH",
        body: { division, zone },
      }),
      invalidatesTags: ["Executive"],
      transformResponse: (response: IApiResponse<IUserData[]>) =>
        response.data ?? [],
    }),

    createExecutive: build.mutation<
      CreateExecutiveResponse,
      CreateExecutiveArgs
    >({
      query: ({ phone, name, division, zone, avatar }) => {
        const fd = new FormData();
        fd.append("phone", phone);
        fd.append("name", name);
        fd.append("division", division);
        fd.append("zone", zone);
        if (avatar instanceof File) {
          fd.append("avatar", avatar);
        }
        return {
          url: `/executive/create`,
          method: "POST",
          body: fd,
        };
      },
      invalidatesTags: ["Executive"],
      transformResponse: (response: CreateExecutiveResponse) => response,
    }),

    // Consumers Queries
    getAllConsumers: build.query<number, void>({
      query: () => `/consumer/count`,
      providesTags: ["Consumers"],
      transformResponse: (response: ICountResponse) => response.count ?? 0,
    }),

    // Shopkeepers Queries
    getAllShopkeepers: build.query<number, void>({
      query: () => `/shopkeeper/count`,
      providesTags: ["Shopkeepers"],
      transformResponse: (response: ICountResponse) => response.count ?? 0,
    }),
  }),
});

export const {
  useGetAllExecutivesQuery,
  useGetAllConsumersQuery,
  useGetExecutivesByAreaQuery,
  useGetExecutiveOnBoardedShopsQuery,
  useDeleteExecutiveMutation,
  useUpdateExecutiveMutation,
  useCreateExecutiveMutation,
  useGetAllShopkeepersQuery,
} = agentApi;
