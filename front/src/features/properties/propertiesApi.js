import { api } from "../api/api";

export const propertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: "/properties",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPropertiesQuery } = propertiesApi;
