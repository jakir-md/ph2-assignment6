import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { startTour } from "./layout/TourGuide";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserMenu({ userInfo }: any) {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  return (
    <div id="ProfileLogo">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarImage
                src={userInfo.picture}
                className="hover:cursor-pointer"
                alt="Profile image"
              />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64 rounded-sm" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {`${userInfo.name}`}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {userInfo.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuGroup></DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => startTour()}
            className="hover:cursor-pointer"
          >
            Start Tour
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span onClick={handleLogout} className="hover:cursor-pointer">
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
