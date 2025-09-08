import type { ISidebarItems } from "@/types";

export const generateRoutes = (sideBarItems: ISidebarItems[]) => {
  return sideBarItems.flatMap((sideBarItem) =>
    sideBarItem.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
