import { lazy } from "react";
const AnalyticsPage = lazy(() => import("@/pages/user/AnalyticsPage"));
const CashInPage = lazy(() => import("@/pages/user/CashInPage"));
const SendMoneyPage = lazy(() => import("@/pages/user/SendMoneyPage"));
const CashOutPage = lazy(() => import("@/pages/user/CashOutPage"));
const TransactionPage = lazy(() => import("@/pages/user/TransactionPage"));
export const userSidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
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
        url: "/user/cash-in",
        component: CashInPage,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoneyPage,
      },
      {
        title: "Cash out",
        url: "/user/cash-out",
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
        url: "/user/all-transactions",
        component: TransactionPage,
      },
    ],
  },
];
