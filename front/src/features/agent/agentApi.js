import { api } from "../api/api";

export const agentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAgents: builder.query({
            query: () => ({
                url: "/agents",
                methode: "GET",
            }),
        }),
    }),
});

export const { useGetAgentsQuery } = agentApi;
