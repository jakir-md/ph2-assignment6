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
import { toast } from "sonner";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";

const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/^(?=.*[A-Z])/, { message: "At least one uppercase" })
      .regex(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, {
        message: "At least one special character",
      })
      .regex(/(?=.*\d)/, { message: "At least one number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/^(?=.*[A-Z])/, { message: "At least one uppercase" })
      .regex(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, {
        message: "At least one special character",
      })
      .regex(/(?=.*\d)/, { message: "At least one number" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/^(?=.*[A-Z])/, { message: "At least one uppercase" })
      .regex(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, {
        message: "At least one special character",
      })
      .regex(/(?=.*\d)/, { message: "At least one number" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
type passwordType = z.infer<typeof passwordSchema>;

export default function UpdatePassword() {
  const [changePassword] = useUpdateProfileMutation();
  const { data: userInfo } = useGetMeQuery(undefined);
  const accountPasswordForm = useForm<passwordType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onPasswordFormSubmit = async (data: passwordType) => {
    const toastId = toast.loading("Updating Profile..");
    try {
      const result = await changePassword({
        userId: userInfo?.data?._id,
        payload: data,
      }).unwrap();
      if (result.success) {
        toast.success("Password Changed Successfully.", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed: ${error.data.message}`, { id: toastId });
    }
  };
  return (
    <div className="mt-5">
      <Card className="rounded-md max-w-sm min-w-[340px] mx-auto">
        <CardContent>
          <div>
            <h1 className="mb-5 font-semibold text-xl text-center">
              Change Password
            </h1>
            <Form {...accountPasswordForm}>
              <form
                id="accountPassword"
                onSubmit={accountPasswordForm.handleSubmit(
                  onPasswordFormSubmit
                )}
                className="space-y-2"
              >
                <FormField
                  control={accountPasswordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <Password {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div>
              <Button
                form="accountPassword"
                type="submit"
                className="w-full mt-4 hover:cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
