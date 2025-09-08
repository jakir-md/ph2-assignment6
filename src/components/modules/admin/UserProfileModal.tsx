/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IUser } from "./profileTypes";
import UserProfileCard from "./UserProfileCard";

export default function UserProfileModal({
  open,
  userInfo,
  onOpenChange,
}: {
  open: boolean;
  userInfo: IUser;
  onOpenChange: (str: boolean) => void;
}) {
  console.log("user modal", userInfo);
  return (
    <div className="min-w-3xl">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-md max-h-[400px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Profile Information</DialogTitle>
          </DialogHeader>
            <div className="max-h-[320px]">
              <UserProfileCard user={userInfo} />
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
