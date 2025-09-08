import { lazy } from "react";
const AnalyticsPage = lazy(() => import("@/pages/user/UserAnalyticsPage"));
const CashInPage = lazy(() => import("@/pages/user/CashInPage"));
const SendMoneyPage = lazy(() => import("@/pages/user/SendMoneyPage"));
const TransactionPage = lazy(() => import("@/pages/user/TransactionPage"));
const VerifyWithKYCPage = lazy(() => import("@/pages/VerifyWithKYCPage"));
const UpdateProfilePage = lazy(() => import("@/pages/user/UpdateProfilePage"));
export const agentSideBarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/agent/dashboard/overview",
        component: AnalyticsPage,
      },
    ],
  },
  {
    title: "Services",
    url: "#",
    items: [
      {
        title: "Cash In",
        url: "/agent/dashboard/cash-in",
        component: CashInPage,
      },
      {
        title: "Send Money",
        url: "/agent/dashboard/send-money",
        component: SendMoneyPage,
      },
    ],
  },
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "View Transactions",
        url: "/agent/dashboard/all-transactions",
        component: TransactionPage,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "KYC Verification",
        url: "/agent/dashboard/verify-with-kyc",
        component: VerifyWithKYCPage,
      },
      {
        title: "Update Profile",
        url: "/agent/dashboard/update-profile",
        component: UpdateProfilePage,
      },
    ],
  },
];
