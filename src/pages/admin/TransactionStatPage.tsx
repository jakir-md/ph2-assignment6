import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePickerFrom } from "@/utils/DatePickerFrom";
import { DatePickerTo } from "@/utils/DatePickerTo";
import { useTransactionStatisticsQuery } from "@/redux/features/admin/admin.api";
import { DailyTransactionStatChart } from "@/components/modules/admin/DailyTransactionStatChart";

export default function TransactionStatPage() {
  const sevenDaysAgo = new Date();
  const currDate = new Date();
  sevenDaysAgo.setDate(new Date().getDate() - 7);
  const today = sevenDaysAgo.toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(today));
  const [toDate, setToDate] = useState<Date | undefined>(new Date(currDate));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["COMPLETED"]);
  const [selectedType, setSelectedType] = useState<string[]>([
    "USER_CASH_OUT",
    "USER_CASH_IN",
    "USER_ADD_MONEY",
    "USER_SEND_MONEY",
    "AGENT_SEND_MONEY",
  ]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([
    "USER",
    "AGENT",
  ]);
  const [page, setPage] = useState(1);
  const totalPage = 2;
  const { data, isLoading } = useTransactionStatisticsQuery(
    {
      selectedStatus,
      selectedType,
      selectedUsers,
      searchTerm,
      fromDate: fromDate?.toISOString(),
      toDate: toDate?.toISOString(),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);
  const statusOptions = [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Reversed", value: "REVERSED" },
  ];

  const userOptions = [
    { label: "User", value: "USER" },
    { label: "Agent", value: "AGENT" },
  ];

  const transactionTypes = [
    { label: "Cash In", value: "USER_CASH_IN" },
    { label: "Cash Out", value: "USER_CASH_OUT" },
    { label: "Add Money", value: "USER_ADD_MONEY" },
    { label: "User Send Money", value: "USER_SEND_MONEY" },
    { label: "Agent Send Money", value: "AGENT_SEND_MONEY" },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchTerm);
    }
  };

  const handleTypeChanged = (data: string) => {
    if (selectedType.includes(data)) {
      const updatedTypes = selectedType.filter((item) => item !== data);
      setSelectedType(updatedTypes);
    } else setSelectedType([...selectedType, data]);
  };

  const handleStatusChanged = (data: string) => {
    if (selectedStatus.includes(data)) {
      const updatedStatus = selectedStatus.filter((item) => item !== data);
      setSelectedStatus(updatedStatus);
    } else setSelectedStatus([...selectedStatus, data]);
  };

  const handleSelectedUsers = (data: string) => {
    if (selectedUsers.includes(data)) {
      const updatedStatus = selectedUsers.filter((item) => item !== data);
      setSelectedUsers(updatedStatus);
    } else setSelectedUsers([...selectedUsers, data]);
  };

  console.log(data?.data[0]?.byDay);
  console.log(data?.data[0]?.overAll);
  console.log(data?.data[0]?.transactions);
  console.log("fromDate", fromDate);
  console.log("to", toDate);
  return (
    <div>
      <div className="md:grid grid-cols-4 md:gap-3">
        <div className="w-full col-span-1 max-w-3xl my-3 md:my-0">
          <Card className="rounded-md py-0 gap-2">
            <CardHeader className="pb-0">
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={["item-4"]}
              >
                <AccordionItem value="item-4">
                  <AccordionTrigger className="py-0 pb-1">
                    Filter Options
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <div className="mt-2">
                      <Input
                        onKeyUp={handleSearch}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter Search Terms"
                      ></Input>
                    </div>
                    <Accordion
                      type="multiple"
                      className="w-full"
                      defaultValue={["item-3", "item-2"]}
                    >
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="py-2 pb-4">
                          Date
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <DatePickerFrom
                            title="From"
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            after={toDate as Date}
                          />
                          <DatePickerTo
                            title="To"
                            toDate={toDate}
                            setToDate={setToDate}
                            before={fromDate as Date}
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="py-2 pb-4 font-medium">
                          Role
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          {userOptions.map((opt) => (
                            <div
                              key={opt.label}
                              className="flex gap-2 items-center  hover:cursor-pointer"
                            >
                              <Checkbox
                                id={opt.label}
                                checked={selectedUsers.includes(opt.value)}
                                onCheckedChange={() =>
                                  handleSelectedUsers(opt.value)
                                }
                              />
                              <Label htmlFor={opt.label}>{opt.label}</Label>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="py-2 pb-4 font-medium">
                          Status
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          {statusOptions.map((opt) => (
                            <div
                              key={opt.label}
                              className="flex gap-2 items-center  hover:cursor-pointer"
                            >
                              <Checkbox
                                id={opt.label}
                                checked={selectedStatus.includes(opt.value)}
                                onCheckedChange={() =>
                                  handleStatusChanged(opt.value)
                                }
                              />
                              <Label htmlFor={opt.label}>{opt.label}</Label>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="py-2 pb-4">
                          Transaction Type
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          {transactionTypes.map((opt) => (
                            <div
                              key={opt.label}
                              className="flex gap-2 items-center  hover:cursor-pointer"
                            >
                              <Checkbox
                                id={opt.label}
                                onCheckedChange={() =>
                                  handleTypeChanged(opt.value)
                                }
                                checked={selectedType.includes(opt.value)}
                              />
                              <Label htmlFor={opt.label}>{opt.label}</Label>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex-col gap-2"></CardFooter>
          </Card>
        </div>
        <div className="w-full col-span-3 rounded-md max-w-3xl">
          {!isLoading && (
            <DailyTransactionStatChart
              overAllData={data?.data[0]?.overAll[0]}
              chartData={data?.data[0]?.byDay}
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
                  {data?.data[0]?.transactions.map(
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
                    }) => (
                      <TableRow>
                        <TableCell className="font-medium">
                          {item.fromPhone}
                        </TableCell>
                        <TableCell className="flex items-center justify-between gap-1">
                          {item.toPhone}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {item.transactionType.split("_").slice(1).join("_")}
                          </div>
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.transactionId}</TableCell>
                        <TableCell>{item.userCharge}</TableCell>
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
