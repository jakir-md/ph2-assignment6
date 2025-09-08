import { baseApi } from "@/redux/baseApi";

export const systemParameterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSystemParameter: builder.query({
      query: () => ({
        url: "/system-parameter/current-parameter",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentSystemParameterQuery} = systemParameterApi;
