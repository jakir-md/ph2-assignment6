import { lazy } from "react";
const AgentAnalyticsPage = lazy(
  () => import("@/pages/agent/AgentAnalyticsPage")
);

const SendMoneyPage = lazy(() => import("@/pages/user/SendMoneyPage"));
const AgentTransactionPage = lazy(
  () => import("@/pages/agent/AgentTransactionPage")
);
const VerifyWithKYCPage = lazy(() => import("@/pages/VerifyWithKYCPage"));
const UpdateProfile = lazy(() => import("@/pages/UpdateProfile"));
const UpdatePin = lazy(() => import("@/pages/UpdatePin"));
const UpdatePassword = lazy(() => import("@/pages/UpdatePassword"));
const CashInPage = lazy(() => import("@/pages/agent/CashInPage"));
export const agentSideBarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/agent/dashboard",
        component: AgentAnalyticsPage,
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
        component: AgentTransactionPage,
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
        component: UpdateProfile,
      },
      {
        title: "Change Password",
        url: "/agent/dashboard/change-password",
        component: UpdatePassword,
      },
      {
        title: "Change Pin",
        url: "/agent/dashboard/change-pin",
        component: UpdatePin,
      },
    ],
  },
];
