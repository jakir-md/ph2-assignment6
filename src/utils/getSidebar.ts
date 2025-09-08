import { Role } from "@/constants/Role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSideBarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TUser } from "@/types";

export const getSidebar = (userRole: TUser) => {
  switch (userRole) {
    case Role.ADMIN:
      return [...adminSidebarItems];
    case Role.AGENT:
      return [...agentSideBarItems];
    case Role.USER:
      return [...userSidebarItems];
    default:
      return [];
  }
};
