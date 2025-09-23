/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  setTrnxStatus,
  setTrnxSearchTerm,
  setFromDate,
  setToDate,
  setRoles,
  setTrnxType,
} from "@/redux/features/user/transactionHistorySlice";
import { DatePickerFrom } from "@/utils/DatePickerFrom";
import { DatePickerTo } from "@/utils/DatePickerTo";
import { useDispatch, useSelector } from "react-redux";

export default function TransactionFilter({ role }: { role: string }) {
  const dispatch = useDispatch();
  const selector = useSelector;
  const { transactionStatus, transactionType, roles, fromDate, toDate } =
    selector((state: any) => state.trnxReducer);
  const statusOptions = [
    { label: "Completed", value: "COMPLETED" },
    { label: "Pending", value: "PENDING" },
    { label: "Reversed", value: "REVERSED" },
    { label: "Failed", value: "FAILED" },
  ];

  const userOptions = [
    { label: "User", value: "USER" },
    { label: "Agent", value: "AGENT" },
  ];

  const typesOptions = [
    { label: "Cash In", value: "USER_CASH_IN" },
    { label: "Cash Out", value: "USER_CASH_OUT" },
    { label: "Add Money", value: "USER_ADD_MONEY" },
    { label: "User Send Money", value: "USER_SEND_MONEY" },
    { label: "Agent Send Money", value: "AGENT_SEND_MONEY" },
  ];
  return (
    <div>
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
            defaultValue={["item-5"]}
          >
            <AccordionItem value="item-5">
              <AccordionTrigger className="py-0 pb-1">
                Filter Options
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div className="mt-2">
                  <Input
                    onChange={(e) =>
                      dispatch(setTrnxSearchTerm(e.target.value))
                    }
                    placeholder="Enter Search Terms"
                  ></Input>
                </div>
                <Accordion
                  type="multiple"
                  className="w-full"
                  defaultValue={["item-2", "item-1"]}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="py-2 pb-4">
                      Date
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <DatePickerFrom
                        title="From"
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        after={new Date(toDate) as Date}
                      />
                      <DatePickerTo
                        title="To"
                        toDate={toDate}
                        setToDate={setToDate}
                        before={new Date(fromDate) as Date}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  {role === "admin" && (
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
                              checked={roles.includes(opt.value)}
                              onCheckedChange={() =>
                                dispatch(setRoles(opt.value))
                              }
                            />
                            <Label htmlFor={opt.label}>{opt.label}</Label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  <AccordionItem value="item-3">
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
                            checked={transactionStatus.includes(opt.value)}
                            onCheckedChange={() =>
                              dispatch(setTrnxStatus(opt.value))
                            }
                          />
                          <Label htmlFor={opt.label}>{opt.label}</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  {role === "admin" && (
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="py-2 pb-4">
                        Transaction Type
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        {typesOptions.map((opt) => (
                          <div
                            key={opt.label}
                            className="flex gap-2 items-center  hover:cursor-pointer"
                          >
                            <Checkbox
                              id={opt.label}
                              checked={transactionType.includes(opt.value)}
                              onCheckedChange={() =>
                                dispatch(setTrnxType(opt.value))
                              }
                            />
                            <Label htmlFor={opt.label}>{opt.label}</Label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
}
