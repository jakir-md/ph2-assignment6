import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
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
      query: ({ currentQuater }) => ({
        url: `/stat/admin-analytics?currentQuater=${currentQuater}`,
        method: "GET",
        data: null,
      }),
    }),
    registeredUsers: builder.query({
      query: ({ fromDate, toDate }) => ({
        url: `/stat/registeredUserStat?fromDate=${fromDate}&toDate=${toDate}`,
        method: "GET",
        data: null,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userid, payload }) => ({
        url: `/user/${userid}`,
        method: "PATCH",
        data: payload,
      }),
    }),
    updateWallet: builder.mutation({
      query: ({ phone, statusInfo }) => ({
        url: `/wallet/update-status/${phone}`,
        method: "PATCH",
        data: statusInfo,
      }),
      invalidatesTags: ["WALLET"],
    }),
    transactionStatistics: builder.query({
      query: ({
        selectedUsers,
        selectedStatus,
        selectedType,
        searchTerm,
        fromDate,
        toDate,
        limit,
        page,
      }) => ({
        url: `/stat/transactionStat?limit=${limit}&page=${page}&searchTerm=${searchTerm}&selectedUsers=${selectedUsers}&fromDate=${fromDate}&selectedStatus=${selectedStatus}&selectedType=${selectedType}&toDate=${toDate}`,
        method: "GET",
        data: null,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAdminAnalyticsQuery,
  useTransactionStatisticsQuery,
  useRegisteredUsersQuery,
  useUpdateUserMutation,
  useUpdateWalletMutation,
} = adminApi;
