/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import ImageUploader from "@/components/ImageUploader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PinInput from "@/components/PinInput";
import {
  useGetMeQuery,
  useVerifyWithKycMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";

const kycZodSchema = z
  .object({
    userNID: z.string().regex(/^\d{10}$|^\d{17}$/, {
      message: "User NID must be exactly 10 or 17 digits",
    }),
    nomineeName: z
      .string()
      .min(2, { message: "Nominee name must be at least 2 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Nominee name must only contain letters",
      }),
    nomineeNID: z.string().regex(/^\d{10}$|^\d{17}$/, {
      message: "Nominee NID must be exactly 10 or 17 digits",
    }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long" }),
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
    picture: z.any().refine((file) => file instanceof File, {
      message: "Profile photo is required",
    }),
  })
  .refine((data) => data.nomineeNID !== data.userNID, {
    message: "Nominee and User's NID cannot be same.",
    path: ["nomineeNID"],
  });
export type kycFormType = z.infer<typeof kycZodSchema>;
export function KYCForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [image, setImage] = useState<File | null>(null);
  const { data: userInfo } = useGetMeQuery(undefined);
  const [verifyKYC] = useVerifyWithKycMutation();
  const form = useForm<kycFormType>({
    resolver: zodResolver(kycZodSchema),
    defaultValues: {
      userNID: "",
      nomineeName: "",
      nomineeNID: "",
      walletPin: "",
      address: "",
      picture: null,
    },
  });

  const onSubmit = async (data: kycFormType) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    const toastId = toast.loading("Updating KYC..");
    try {
      const result = await verifyKYC({
        formData,
        id: userInfo.data._id,
      }).unwrap();

      if (result.success) {
        toast.success("Verification successfull.", { id: toastId });
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(`Failed: ${error.data.message}`, { id: toastId });
    }
  };

  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Complete KYC</h1>
          <p className="text-muted-foreground text-xs text-balance">
            Complete KYC to access all the features
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form
              id="kyc-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="userNID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your NID</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="10XXXXXXXX" {...field} />
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
                name="nomineeNID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominee NID</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="10XXXXXXXX" {...field} />
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
                name="nomineeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nominee Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex. Salah Uddin"
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="House/Road/Area, City"
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
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                      <ImageUploader
                        onChange={(file: File | null) => {
                          setImage(file);
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walletPin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set PIN</FormLabel>
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
              form="kyc-form"
              type="submit"
              className="w-full hover:cursor-pointer"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
