import { createSlice } from "@reduxjs/toolkit";

type AdminAnalyticsState = {
  fromDate: string;
  toDate: string;
};

const sevenDaysAgo = new Date();
const currDate = new Date();
sevenDaysAgo.setDate(new Date().getDate() - 60);

const initialState: AdminAnalyticsState = {
  fromDate: sevenDaysAgo.toISOString(),
  toDate: currDate.toISOString(),
};

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {
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
  setFromDate,
  setToDate,
} = adminAnalyticsSlice.actions;
export default adminAnalyticsSlice.reducer;
