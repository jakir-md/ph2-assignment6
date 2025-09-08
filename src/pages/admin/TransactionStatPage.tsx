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
import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function TransactionStatPage() {
  const id = useId();
  const statusOptions = [
    { id: `${id}-1`, label: "All", value: "" },
    { id: `${id}-2`, label: "Completed", value: "COMPLETED" },
    { id: `${id}-3`, label: "Pending", value: "PENDING" },
    { id: `${id}-4`, label: "Reversed", value: "REVERSED" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const totalPage = 2;
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(searchTerm);
    }
  };
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
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
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
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="py-2 pb-4 font-medium">
                          Status
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          {statusOptions.map((opt) => (
                            <div
                              key={opt.id}
                              className="flex gap-2 items-center  hover:cursor-pointer"
                            >
                              <Checkbox
                                id={opt.id}
                                checked={selectedStatus === opt.value}
                                onCheckedChange={() =>
                                  setSelectedStatus(opt.value)
                                }
                              />
                              <Label htmlFor={opt.id}>{opt.label}</Label>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="pt-2 pb-0">
                          Account Status
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          {/* {accountStatusOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex gap-2 items-center  hover:cursor-pointer"
                      >
                        <Checkbox
                          id={opt.id}
                          checked={accountStatus === opt.value}
                          onCheckedChange={() => setAccountStatus(opt.value)}
                        />
                        <Label htmlFor={opt.id}>{opt.label}</Label>
                      </div>
                    ))} */}
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
                    <TableHead>TNX Id</TableHead>
                    <TableHead>Charge</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {transactionInfo?.data.map(
                    (item: {
                      toId: { phone: string };
                      fromId: { phone: string };
                      status: string;
                      transactionId: string;
                      amount: string;
                      userCharge: string;
                      transactionType: string;
                      toPhone: string;
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
                        <TableCell>{item.userCharge}</TableCell>
                        <TableCell className="text-right">
                          {userInfo?.data.phone === item?.toId?.phone
                            ? "+"
                            : "-"}{" "}
                          {item.amount}
                        </TableCell>
                      </TableRow>
                    )
                  )} */}
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
