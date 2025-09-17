import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import PinInput from "@/components/PinInput";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useGetCurrentSystemParameterQuery } from "@/redux/features/systemParameter/systemParameterApi";
import CashInModal from "./CashInModal";

const cashInFormSchema = z.object({
  pin: z
    .string()
    .regex(/^\d{5}$/, { message: "PIN must be exactly 5 digits." })
    .regex(/^(?!([0-9])\1{4}).*$/, {
      message: "PIN cannot have all identical digits.",
    })
    .regex(
      /^(?!(?:01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321)).*$/,
      { message: "PIN cannot be sequential ascending or descending." }
    ),
  userPhone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
    message: "Invalid Phone Number",
  }),
  amount: z.coerce
    .number({ message: "Amount must be a number." })
    .min(1, { message: "Minimum 1 taka." })
    .nonnegative({ message: "Amount cannnot be negative." }),
});

export type cashInFormType = z.infer<typeof cashInFormSchema>;
export function CashInForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data: userInfo } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: systemParameter } = useGetCurrentSystemParameterQuery(
    undefined,
    {
      skip: !userInfo,
    }
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    pin: "",
    amount: 10,
    userPhone: "",
    comission: "",
  });
  const navigate = useNavigate();
  const form = useForm<cashInFormType>({
    resolver: zodResolver(cashInFormSchema),
    defaultValues: {
      pin: "",
      amount: 10,
      userPhone: "",
    },
  });
  const onSubmit = async (data: cashInFormType) => {
    if (userInfo?.data.phone === data.userPhone) {
      toast.error("CashIn to your own account is not permitted.");
      return;
    }

    if (!userInfo?.data.isVerified) {
      toast.error("Complete KYC verfication to use cash in feature.");
      return;
    }

    let cashInComission =
      data.amount * systemParameter?.data.agentComissionForUserCashIn;
    cashInComission = parseFloat(cashInComission.toFixed(2));

    if (userInfo?.data.walletId.balance - data.amount < 0) {
      toast.error("Insufficient Balance.");
      return;
    }

    const modalData = {
      ...data,
      comission: cashInComission.toString(),
      role: "agent",
    };

    setFormData(modalData);
    setModalOpen(true);
  };
  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Cash In</h1>
          <p className="text-muted-foreground text-xs text-balance"></p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form
              id="register-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="userPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="User phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Amount" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PinInput {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div>
            <Button
              form="register-form"
              type="submit"
              className="w-full hover:cursor-pointer"
            >
              Cash In
            </Button>
            <CashInModal
              open={modalOpen}
              formInfo={formData}
              onOpenChange={setModalOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
