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
    getTransactionHistory: builder.query({
      query: ({ page, limit }) => ({
        url: `/transaction/user-history?page=${page}&limit=${limit}`,
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
      query: ({ phone, payload }) => ({
        url: `/wallet/update-status/${phone}`,
        method: "PATCH",
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
} = userApi;
