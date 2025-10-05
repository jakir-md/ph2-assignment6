/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionTable({ limit }: { limit: number }) {
  const [page, setPage] = useState(1);
  const { data: userInfo } = useGetMeQuery(undefined);
  const selector = useSelector;
  const { transactionStatus, fromDate, searchTerm, toDate } = selector(
    (state: any) => state.trnxReducer
  );
  const { data: transactionInfo, isLoading } = useGetTransactionHistoryQuery(
    {
      page,
      limit,
      selectedStatus: transactionStatus,
      searchTerm,
      fromDate: fromDate,
      toDate: toDate,
    },
    {
      skip: !userInfo,
      refetchOnMountOrArgChange: true,
    }
  );
  const totalPage = transactionInfo?.meta.totalPage || 2;
  return (
    <div>
      {isLoading ? (
        <div className="">
          <Skeleton className=" h-[300px] md:h-[500px] mx-auto"></Skeleton>
        </div>
      ) : (
        <Card className="mb-4 rounded-md max-w-3xl inset-0 mx-auto">
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
                  <TableHead>
                    {userInfo?.data.role === "USER" ? "Charge" : "Comission"}
                  </TableHead>
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
                    fromPhone: string;
                    agentComission: string;
                  }) => (
                    <TableRow key={item.transactionId}>
                      <TableCell className="font-medium">
                        {item?.toPhone === userInfo?.data.phone
                          ? item?.fromPhone
                          : item?.toPhone || "Card to Wallet"}
                      </TableCell>
                      <TableCell className="flex items-center justify-between">
                        {item.transactionType.split("_").slice(1).join("_")}
                        {item?.toPhone === userInfo?.data.phone &&
                          item.status === "COMPLETED" && (
                            <h1 className="text-white bg-green-500 rounded-full flex items-center justify-center text-center text-xs h-5 w-8">
                              IN
                            </h1>
                          )}
                        {item?.fromPhone === userInfo?.data.phone &&
                          item.status === "COMPLETED" && (
                            <h1 className="text-white bg-red-500 rounded-full flex items-center justify-center text-center text-xs h-5 w-8">
                              OUT
                            </h1>
                          )}
                        {item.status !== "COMPLETED" && (
                          <h1 className="text-white bg-amber-600 rounded-full flex items-center justify-center text-center text-xs h-5 w-8">
                            N/A
                          </h1>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.status}
                        </div>
                      </TableCell>
                      <TableCell>{item.transactionId}</TableCell>
                      <TableCell>
                        {userInfo?.data.role === "USER"
                          ? item.userCharge || "N/A"
                          : item.agentComission}
                      </TableCell>
                      <TableCell className="text-right">
                        {item?.status === "COMPLETED" &&
                          userInfo?.data.phone === item?.toPhone &&
                          "+"}
                        {item?.status === "COMPLETED" &&
                          userInfo?.data.phone !== item?.toPhone &&
                          "-"}
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
      )}
    </div>
  );
}
