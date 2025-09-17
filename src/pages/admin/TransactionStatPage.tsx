/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { useState } from "react";
import { useTransactionStatisticsQuery } from "@/redux/features/admin/admin.api";
import { DailyTransactionStatChart } from "@/components/modules/admin/DailyTransactionStatChart";
import TransactionFilter from "@/components/modules/shared/TransactionFilter";
import { useSelector } from "react-redux";

export default function TransactionStatPage() {
  const [page, setPage] = useState(1);
  const selector = useSelector;
  const limit = 10;
  const {
    transactionStatus,
    fromDate,
    transactionType,
    roles,
    searchTerm,
    toDate,
  } = selector((state: any) => state.trnxReducer);
  const { data, isLoading } = useTransactionStatisticsQuery(
    {
      selectedStatus: transactionStatus,
      selectedType: transactionType,
      selectedUsers: roles,
      searchTerm,
      fromDate,
      toDate,
      limit,
      page,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const totalPage = data?.meta?.totalPage || 2;
  console.log(data);
  return (
    <div className="mt-4">
      <div className="md:grid grid-cols-4 md:gap-3">
        <div className="w-full col-span-1 max-w-3xl my-3 md:my-0">
          <TransactionFilter role="admin" />
        </div>
        <div className="w-full col-span-3 rounded-md max-w-3xl">
          {!isLoading && (
            <DailyTransactionStatChart
              overAllData={data?.data?.overAll[0]}
              chartData={data?.data?.byDay}
            />
          )}
          <Card className="mt-4 rounded-md max-w-3xl inset-0 mx-auto">
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
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tnx Id</TableHead>
                    <TableHead>Charge</TableHead>
                    <TableHead>Comission</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.transactions.map(
                    (item: {
                      fromPhone: string;
                      toPhone: string;
                      status: string;
                      transactionId: string;
                      amount: number;
                      userCharge: number;
                      agentComission: number;
                      transactionType: string;
                      systemRevenue: number;
                      createdAt: string;
                    }) => (
                      <TableRow>
                        <TableCell className="font-medium">
                          {item?.fromPhone || "Bank to Wallet"}
                        </TableCell>
                        <TableCell className="flex items-center justify-between gap-1">
                          {item.toPhone}
                        </TableCell>
                        <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {item.transactionType.split("_").slice(1).join("_")}
                          </div>
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.transactionId}</TableCell>
                        <TableCell>{item.userCharge ? item.userCharge : "N/A"}</TableCell>
                        <TableCell>
                          {item.agentComission ? item.agentComission : "N/A"}
                        </TableCell>
                        <TableCell>{item.systemRevenue}</TableCell>
                        <TableCell>{item.amount}</TableCell>
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
    </div>
  );
}
