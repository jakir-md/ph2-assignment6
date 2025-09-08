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
import CashOutModal from "./CashOutModal";

const sendMoneySchema = z.object({
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
  agentPhone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
    message: "Invalid Phone Number",
  }),
  amount: z.coerce
    .number({ message: "Amount must be a number." })
    .min(1, { message: "Minimum 1 taka." })
    .nonnegative({ message: "Amount cannnot be negative." }),
});

export type sendMoneyFormType = z.infer<typeof sendMoneySchema>;
export function CashOutForm({
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

  console.log(systemParameter);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    pin: "",
    amount: 10,
    agentPhone: "",
    fee: "",
  });
  const navigate = useNavigate();
  const form = useForm<sendMoneyFormType>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      pin: "",
      amount: 10,
      agentPhone: "",
    },
  });
  const onSubmit = async (data: sendMoneyFormType) => {
    console.log(userInfo);
    console.log(systemParameter.userCashOutCharge);

    if (userInfo?.data.phone === data.agentPhone) {
      toast.error("Cashout to your own account is not permitted.");
      return;
    }

    if (!userInfo?.data.isVerified) {
      toast.error("Complete KYC verfication to cash out.");
      return;
    }

    let cashOutCharge = data.amount * systemParameter?.data.userCashOutCharge;
    cashOutCharge = parseFloat(cashOutCharge.toFixed(2));

    if (userInfo?.data.walletId.balance - data.amount - cashOutCharge < 0) {
      toast.error("Insufficient Balance.");
      return;
    }

    const modalData = {
      ...data,
      fee: cashOutCharge.toString(),
      role: "user",
    };

    setFormData(modalData);
    setModalOpen(true);
  };
  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Cash Out</h1>
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
                name="agentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Agent phone number"
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
              Cash Out
            </Button>
            <CashOutModal
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
