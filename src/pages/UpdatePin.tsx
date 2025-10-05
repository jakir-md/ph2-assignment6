/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/Password";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";

const walletPinFormSchema = z
  .object({
    oldPin: z
      .string()
      .regex(/^\d{5}$/, { message: "PIN must be exactly 5 digits." })
      .regex(/^(?!([0-9])\1{4}).*$/, {
        message: "PIN cannot have all identical digits.",
      })
      .regex(
        /^(?!(?:01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321)).*$/,
        { message: "PIN cannot be sequential ascending or descending." }
      ),
    walletPin: z
      .string()
      .regex(/^\d{5}$/, { message: "PIN must be exactly 5 digits." })
      .regex(/^(?!([0-9])\1{4}).*$/, {
        message: "PIN cannot have all identical digits.",
      })
      .regex(
        /^(?!(?:01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321)).*$/,
        { message: "PIN cannot be sequential ascending or descending." }
      ),
    confirmPin: z
      .string()
      .regex(/^\d{5}$/, { message: "PIN must be exactly 5 digits." })
      .regex(/^(?!([0-9])\1{4}).*$/, {
        message: "PIN cannot have all identical digits.",
      })
      .regex(
        /^(?!(?:01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321)).*$/,
        { message: "PIN cannot be sequential ascending or descending." }
      ),
  })
  .refine((data) => data.confirmPin === data.walletPin, {
    message: "New Pin Doesn't match.",
    path: ["confirmPin"],
  });

type walletFormType = z.infer<typeof walletPinFormSchema>;

export default function UpdatePin() {
  const [changePin] = useUpdateProfileMutation();
  const { data: userInfo } = useGetMeQuery(undefined);
  const walletPinForm = useForm<walletFormType>({
    resolver: zodResolver(walletPinFormSchema),
    defaultValues: {
      oldPin: "",
      walletPin: "",
      confirmPin: "",
    },
  });
  const onWalletPinFormSubmit = async (data: walletFormType) => {
    const toastId = toast.loading("Changing PIN..");
    try {
      const result = await changePin({
        userId: userInfo?.data?._id,
        payload: data,
      }).unwrap();
      if (result.success) {
        toast.success("PIN Changed Successfully.", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed: ${error.data.message}`, { id: toastId });
    }
  };
  return (
    <div className="my-4">
      <Card className="rounded-md max-w-sm min-w-[340px] mx-auto">
        <CardContent>
          <div>
            <h1 className="mb-5 font-semibold text-center text-xl">Change Pin</h1>
            <Form {...walletPinForm}>
              <form
                id="walletPin"
                className="space-y-2"
                onSubmit={walletPinForm.handleSubmit(onWalletPinFormSubmit)}
              >
                <FormField
                  control={walletPinForm.control}
                  name="oldPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Pin</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={walletPinForm.control}
                  name="walletPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Pin</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={walletPinForm.control}
                  name="confirmPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Pin</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div>
              <Button
                form="walletPin"
                type="submit"
                className="w-full mt-4 hover:cursor-pointer"
              >
                Change Pin
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
