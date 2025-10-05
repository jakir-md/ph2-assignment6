import { lazy } from "react";

const AnalyticsPage = lazy(() => import("@/pages/admin/AdminAnalyticsPage"));
const AccountsPage = lazy(() => import("@/pages/admin/AccountsPage"));
const UpdateProfile = lazy(() => import("@/pages/UpdateProfile"));
const UpdatePassword = lazy(() => import("@/pages/UpdatePassword"));
const TransactionStatPage = lazy(
  () => import("@/pages/admin/TransactionStatPage")
);
const SystemParameterPage = lazy(
  () => import("@/pages/admin/SystemParameterPage")
);

export const adminSidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        component: AnalyticsPage,
      },
    ],
  },
  {
    title: "Manage Roles",
    url: "#",
    items: [
      {
        title: "Accounts",
        url: "/admin/dashboard/accounts",
        component: AccountsPage,
      },
    ],
  },
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "View Transactions",
        url: "/admin/dashboard/transactions",
        component: TransactionStatPage,
      },
    ],
  },
  {
    title: "System Management",
    url: "#",
    items: [
      {
        title: "Update Parameter",
        url: "/admin/dashboard/update-parameter",
        component: SystemParameterPage,
      },
    ],
  },
  {
    title: "Profile",
    url: "#",
    items: [
      {
        title: "Update Profile",
        url: "/admin/dashboard/update-profile",
        component: UpdateProfile,
      },
      {
        title: "Change Password",
        url: "/admin/dashboard/change-password",
        component: UpdatePassword,
      },
    ],
  },
];
