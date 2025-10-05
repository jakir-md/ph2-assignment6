import CommonLayout from "@/components/layout/CommonLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Role } from "@/constants/Role";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { agentSideBarItems } from "./agentSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import AboutPage from "@/pages/AboutPage";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import UnAuthorized from "@/pages/UnAuthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/features",
        Component: Features,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/user/dashboard",
    Component: withAuth(DashboardLayout, Role.USER as string),
    children: [...generateRoutes(userSidebarItems)],
  },
  {
    path: "/agent/dashboard",
    Component: withAuth(DashboardLayout, Role.AGENT as string),
    children: [...generateRoutes(agentSideBarItems)],
  },
  {
    path: "/admin/dashboard",
    Component: withAuth(DashboardLayout, Role.ADMIN as string),
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "unAuthorized",
    Component: UnAuthorized,
  },
]);
