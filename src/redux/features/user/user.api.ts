import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerInfo) => ({
        url: "/user/register",
        method: "POST",
        data: registerInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        data: null,
      }),
      providesTags: ["AUTH"],
    }),
  }),
});

export const { useGetMeQuery, useRegisterMutation } = userApi;
