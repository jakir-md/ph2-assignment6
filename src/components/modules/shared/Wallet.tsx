import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletSwitch from "@/components/WalletSwitch";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useEffect, useState } from "react";

export default function Wallet() {
  const [checked, setChecked] = useState<boolean>(true);
  const { data: userInfo } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (userInfo?.data?.walletId?.status === "ACTIVE") {
      setChecked(true);
      console.log("checked inside parent", checked);
    }else setChecked(false);
  }, [userInfo, checked]);

  return (
    <div className="mt-4 relative">
      <Card className="rounded-md max-w-3xl inset-0 mx-auto">
        <CardHeader>
          <CardTitle>{userInfo?.data.name}</CardTitle>
          <CardDescription>
            Status: {checked ? "ACTIVE" : "INACTIVE"}
          </CardDescription>
          <CardAction className={cn("z-0", checked && "z-5")}>
            <WalletSwitch onChange={setChecked} checked={checked} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="bg-card">
            <h1>
              Balance: {Number(userInfo?.data.walletId.balance).toFixed(2)} Tk
            </h1>
            <h1 className="text-gray-400">Phone: {userInfo?.data.phone}</h1>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {userInfo?.data.walletId.status === "BLOCKED" && (
        <div className="h-[188px] inset-0 max-w-3xl mx-auto border absolute z-10 opacity-70 bg-red-100 rounded-md"></div>
      )}
      {checked && (
        <div className="h-[188px] inset-0 max-w-3xl mx-auto border absolute z-2 opacity-20 bg-green-600 rounded-md"></div>
      )}
    </div>
  );
}
