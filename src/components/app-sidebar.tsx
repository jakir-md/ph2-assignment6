import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { getSidebar } from "@/utils/getSidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetMeQuery(undefined);
  const sideBar = {
    navMain: getSidebar(userData?.data.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          to={"/"}
          className="px-2 py-3 rounded-md hover:cursor-pointer hover:bg-gray-100 flex gap-3 items-center"
        >
          <div>
            <Logo />
          </div>
          <h1 className="font-bold text-xl">DigiWallet</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sideBar.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item: { title: string; url: string }) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
