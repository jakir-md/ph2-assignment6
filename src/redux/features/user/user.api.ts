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
      providesTags: ["AUTH", "WALLET"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneInfo) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: sendMoneInfo,
      }),
    }),
    verifyWithKyc: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/user/verify-with-kyc/${id}`,
        method: "PATCH",
        data: formData,
      }),
    }),
    cashOut: builder.mutation({
      query: (formData) => ({
        url: `/wallet/cash-out`,
        method: "POST",
        data: formData,
      }),
    }),
    cashIn: builder.mutation({
      query: ({ formInfo, phone }) => ({
        url: `/wallet/add-money-by-agent/${phone}`,
        method: "POST",
        data: formInfo,
      }),
    }),
    getTransactionHistory: builder.query({
      query: ({
        page,
        limit,
        fromDate,
        toDate,
        selectedStatus,
        searchTerm,
      }) => ({
        url: `/transaction/user-history?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}&selectedStatus=${selectedStatus}&searchTerm=${searchTerm}`,
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
    agentComission: builder.query({
      query: () => ({
        url: "/stat/agentComission",
        method: "GET",
        data: null,
      }),
    }),
    addMoney: builder.mutation({
      query: ({ payload, phone }) => ({
        url: `/wallet/add-money/${phone}`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useRegisterMutation,
  useVerifyWithKycMutation,
  useSendMoneyMutation,
  useCashOutMutation,
  useGetTransactionHistoryQuery,
  useUpdateUserMutation,
  useUpdateWalletMutation,
  useCashInMutation,
  useAgentComissionQuery,
  useAddMoneyMutation,
} = userApi;
