import { lazy } from "react";
const AnalyticsPage = lazy(() => import("@/pages/user/UserAnalyticsPage"));
const AddMoneyPage = lazy(() => import("@/pages/user/AddMoneyPage"));
const SendMoneyPage = lazy(() => import("@/pages/user/SendMoneyPage"));
const CashOutPage = lazy(() => import("@/pages/user/CashOutPage"));
const VerifyWithKYCPage = lazy(() => import("@/pages/VerifyWithKYCPage"));
const UpdateProfilePage = lazy(() => import("@/pages/user/UpdateProfilePage"));
const UserTransactionPage = lazy(
  () => import("@/pages/user/UserTransactionPage")
);
export const userSidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/user/dashboard/overview",
        component: AnalyticsPage,
      },
    ],
  },
  {
    title: "Services",
    url: "#",
    items: [
      {
        title: "Add Money",
        url: "/user/dashboard/add-money",
        component: AddMoneyPage,
      },
      {
        title: "Send Money",
        url: "/user/dashboard/send-money",
        component: SendMoneyPage,
      },
      {
        title: "Cash out",
        url: "/user/dashboard/cash-out",
        component: CashOutPage,
      },
    ],
  },
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "View Transactions",
        url: "/user/dashboard/all-transactions",
        component: UserTransactionPage,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "KYC Verification",
        url: "/user/dashboard/verify-with-kyc",
        component: VerifyWithKYCPage,
      },
      {
        title: "Update Profile",
        url: "/user/dashboard/update-profile",
        component: UpdateProfilePage,
      },
    ],
  },
];
