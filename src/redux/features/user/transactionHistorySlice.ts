import { createSlice } from "@reduxjs/toolkit";

type TransactionHistoryState = {
  searchTerm: string;
  transactionType: string[];
  fromDate: string;
  toDate: string;
  transactionStatus: string[];
  roles: string[];
};

const sevenDaysAgo = new Date();
const currDate = new Date();
sevenDaysAgo.setDate(new Date().getDate() - 7);

const initialState: TransactionHistoryState = {
  searchTerm: "",
  roles: ["USER", "AGENT"],
  transactionType: [
    "USER_CASH_OUT",
    "AGENT_CASH_IN",
    "USER_ADD_MONEY",
    "USER_SEND_MONEY",
    "AGENT_SEND_MONEY",
  ],
  transactionStatus: ["COMPLETED", "PENDING", "REVERSED", "FAILED"],
  fromDate: sevenDaysAgo.toISOString(),
  toDate: currDate.toISOString(),
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    setTrnxSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setRoles: (state, action) => {
      if (state.roles.includes(action.payload)) {
        const temp = state.roles.filter((item) => item !== action.payload);
        state.roles = temp;
      } else state.roles = [...state.roles, action.payload];
    },
    setTrnxType: (state, action) => {
      if (state.transactionType.includes(action.payload)) {
        const temp = state.transactionType.filter(
          (item) => item !== action.payload
        );
        state.transactionType = temp;
      } else state.transactionType = [...state.transactionType, action.payload];
    },
    setTrnxStatus: (state, action) => {
      if (state.transactionStatus.includes(action.payload)) {
        const temp = state.transactionStatus.filter(
          (item) => item !== action.payload
        );
        state.transactionStatus = temp;
      } else
        state.transactionStatus = [...state.transactionStatus, action.payload];
    },
    setFromDate: (state, action) => {
      const temp = new Date(action.payload);
      temp.setDate(temp.getDate() + 1);
      state.fromDate = temp.toISOString();
    },
    setToDate: (state, action) => {
      const temp = new Date(action.payload);
      temp.setDate(temp.getDate() + 1);
      state.toDate = temp.toISOString();
    },
  },
});

export const {
  setTrnxSearchTerm,
  setFromDate,
  setToDate,
  setTrnxStatus,
  setTrnxType,
  setRoles,
} = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
