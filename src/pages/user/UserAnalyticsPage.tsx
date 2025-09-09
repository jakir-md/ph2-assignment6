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
import {
  useGetMeQuery,
  useGetTransactionHistoryQuery,
} from "@/redux/features/user/user.api";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function UserAnalyticsPage() {
  const { data: userInfo } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [limit] = useState(6);
  const [page, setPage] = useState(1);
  const { data: transactionInfo } = useGetTransactionHistoryQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const totalPage = transactionInfo?.meta?.totalPage || 1;
  useEffect(() => {
    if (userInfo?.data.walletId.status === "ACTIVE") {
      setChecked(true);
      console.log("Jakir");
    }
  }, [userInfo, checked]);
  console.log(transactionInfo);

  return (
    <div className="">
      <div className="relative">
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
              <h1>Balance: {userInfo?.data.walletId.balance} Tk</h1>
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
      <div className="mt-10">
        <Card className="rounded-md max-w-3xl inset-0 mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              {"Recent Transactions"}
            </CardTitle>
            <CardDescription></CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <Table className="overflow-x-auto">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Phone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tnx Id</TableHead>
                  <TableHead>{userInfo?.data.role === "USER" ? "Charge": "Comission"}</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionInfo?.data.map(
                  (item: {
                    toId: { phone: string };
                    fromId: { phone: string };
                    status: string;
                    transactionId: string;
                    amount: string;
                    userCharge: string;
                    transactionType: string;
                    toPhone: string;
                    agentComission:string;
                  }) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {item?.toId?.phone === userInfo?.data.phone
                          ? item?.fromId?.phone
                          : item?.toId?.phone || item.toPhone}
                      </TableCell>
                      <TableCell className="flex items-center justify-between gap-1">
                        {item.transactionType.split("_").slice(1).join("_")}
                        {item?.toId?.phone === userInfo?.data.phone ? (
                          <h1 className="text-white bg-green-500 rounded-full flex items-center justify-center text-center text-xs h-5 w-8">
                            IN
                          </h1>
                        ) : (
                          <h1 className="text-white bg-red-500 rounded-full flex items-center justify-center text-center text-xs h-5 w-8">
                            OUT
                          </h1>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.status}
                        </div>
                      </TableCell>
                      <TableCell>{item.transactionId}</TableCell>
                      <TableCell>{userInfo?.data.role === "USER" ? item.userCharge : item.agentComission}</TableCell>
                      <TableCell className="text-right">
                        {userInfo?.data.phone === item?.toId?.phone ? "+" : "-"}{" "}
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {totalPage > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => prev - 1)}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: totalPage },
                    (_, index) => index + 1
                  ).map((item) => (
                    <PaginationItem
                      className="hover:cursor-pointer"
                      key={item}
                      onClick={() => setPage(item)}
                    >
                      <PaginationLink isActive={item === page}>
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((prev) => prev + 1)}
                      className={
                        page === totalPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
