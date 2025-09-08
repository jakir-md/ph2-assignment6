import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({
        role,
        fields,
        populate,
        searchTerm,
        isActive,
        limit,
        page,
      }) => ({
        url: `/user/all-user?role=${role}&fields=${fields}&populate=${populate}&searchTerm=${searchTerm}&isActive=${isActive}&limit=${limit}&page=${page}`,
        method: "GET",
        data: null,
      }),
    }),
    adminAnalytics: builder.query({
      query: ({currentQuater}) => ({
        url: `/stat/admin-analytics?currentQuater=${currentQuater}`,
        method: "GET",
        data: null,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAdminAnalyticsQuery
} = userApi;
