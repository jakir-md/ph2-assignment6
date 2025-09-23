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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import UserProfileModal from "@/components/modules/admin/UserProfileModal";
import type { IUser } from "@/components/modules/admin/profileTypes";
import { Input } from "@/components/ui/input";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateWalletMutation,
} from "@/redux/features/admin/admin.api";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountsPage() {
  const id = useId();
  const [selectedRole, setSelectedRole] = useState<string | null>("");
  const [accountStatus, setAccountStatus] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: userInfo, isLoading } = useGetAllUsersQuery(
    {
      role: selectedRole,
      fields: "-password, -walletPin",
      populate: "walletId",
      searchTerm: searchTerm,
      isActive: accountStatus,
      page: page,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const totalPage = userInfo?.meta?.totalPage || 1;
  console.log(userInfo);
  const [updateUser] = useUpdateUserMutation();
  const [updateWallet] = useUpdateWalletMutation();
  const roleOptions = [
    { id: `${id}-1`, label: "All", value: "" },
    { id: `${id}-2`, label: "User", value: "USER" },
    { id: `${id}-3`, label: "Agent", value: "AGENT" },
  ];

  const accountStatusOptions = [
    { id: `${id}-4`, label: "ALL", value: "" },
    { id: `${id}-5`, label: "ACTIVE", value: "ACTIVE" },
    { id: `${id}-6`, label: "INACTIVE", value: "INACTIVE" },
    { id: `${id}-7`, label: "BLOCKED", value: "BLOCKED" },
    { id: `${id}-8`, label: "SUSPENDED", value: "SUSPENDED" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({
    _id: "",
    address: "",
    createdAt: "",
    email: "",
    isActive: "",
    isDeleted: false,
    isVerified: false,
    name: "",
    nomineeNID: "",
    nomineeName: "",
    phone: "",
    picture: "",
    role: "",
    updatedAt: "",
    userNID: "",
    walletId: {
      _id: "",
      balance: 0,
      createdAt: "",
      phone: "",
      status: "",
      updatedAt: "",
      userId: "",
    },
  });

  const handleAccountStatus = async (id: string, status: string) => {
    console.log();
    const toastId = toast.loading("Updating Account Status..");
    try {
      const result = await updateUser({
        userid: id,
        payload: { isActive: status },
      }).unwrap();

      if (result.success) {
        toast.success("Account Status Updated.", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Failed: ${error.message}`, { id: toastId });
    }
  };

  const handleWalletStatus = async (phone: string, status: string) => {
    const toastId = toast.loading("Updating Wallet Status..");
    try {
      const result = await updateWallet({
        phone,
        statusInfo: { status },
      }).unwrap();

      if (result.success) {
        toast.success("Wallet Status Updated.", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Failed: ${error.message}`, { id: toastId });
    }
  };

  const handleCurrentInfo = (user: IUser) => {
    setCurrentInfo(user);
    setModalOpen(true);
  };

  return (
    <div className="mt-5">
      <UserProfileModal
        open={modalOpen}
        userInfo={currentInfo}
        onOpenChange={setModalOpen}
      />
      {isLoading ? (
        <div className="md:grid grid-cols-4 gap-3">
          <Skeleton className="col-span-1 mb-5 md:mb-0 h-[50px] md:h-[400px]"></Skeleton>
          <Skeleton className="col-span-3 h-[300px] md:h-[500px]"></Skeleton>
        </div>
      ) : (
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
                  defaultValue={["item-5"]}
                >
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="py-0 pb-1">
                      Filter Options
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <div className="mt-2">
                        <Input
                          placeholder="Enter Search Terms"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Accordion
                        type="multiple"
                        className="w-full"
                        defaultValue={["item-1"]}
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Roles</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4 text-balance">
                            {roleOptions.map((opt) => (
                              <div
                                key={opt.id}
                                className="flex gap-2 items-center  hover:cursor-pointer"
                              >
                                <Checkbox
                                  className="rounded-full"
                                  id={opt.id}
                                  checked={selectedRole === opt.value}
                                  onCheckedChange={() =>
                                    setSelectedRole(opt.value)
                                  }
                                />
                                <Label htmlFor={opt.id}>{opt.label}</Label>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Account Status</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4 text-balance">
                            {accountStatusOptions.map((opt) => (
                              <div
                                key={opt.id}
                                className="flex gap-2 items-center  hover:cursor-pointer"
                              >
                                <Checkbox
                                  className="rounded-full"
                                  id={opt.id}
                                  checked={accountStatus === opt.value}
                                  onCheckedChange={() =>
                                    setAccountStatus(opt.value)
                                  }
                                />
                                <Label htmlFor={opt.id}>{opt.label}</Label>
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
          <div className="w-full col-span-3 mb-5 rounded-md max-w-3xl">
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="text-center">All Accounts</CardTitle>
                <CardDescription></CardDescription>
                <CardAction></CardAction>
              </CardHeader>
              <CardContent>
                <Table className="overflow-x-auto">
                  <TableCaption></TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Account Status</TableHead>
                      <TableHead>Wallet Status</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userInfo?.data.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium w-[300px]">
                          <div className="flex gap-1 items-center">
                            <div className="rounded-xl h-13 w-13">
                              <img
                                src={user.picture}
                                className="h-13 w-13 rounded-xl"
                                alt=""
                              />
                            </div>
                            <div>
                              <h1>{user.name}</h1>
                              <p className="text-gray-400 text-xs">
                                {user.email}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {user.address}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Select
                            defaultValue={user.isActive}
                            onValueChange={(val) =>
                              handleAccountStatus(user._id, val)
                            }
                          >
                            <SelectTrigger className="w-full rounded-md">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                              <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                              <SelectItem value="SUSPENDED">
                                SUSPENDED
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={user?.walletId?.status}
                            onValueChange={(val) =>
                              handleWalletStatus(user.phone, val)
                            }
                          >
                            {/* <FormControl className="w-full"> */}
                            <SelectTrigger className="w-full rounded-md">
                              <SelectValue />
                            </SelectTrigger>
                            {/* </FormControl> */}
                            <SelectContent>
                              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                              <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => handleCurrentInfo(user)}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex-col gap-2">
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
      )}
    </div>
  );
}
