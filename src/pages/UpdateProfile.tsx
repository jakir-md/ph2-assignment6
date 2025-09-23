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
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";
import { useEffect } from "react";
import { toast } from "sonner";

const userInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
});

type userInfoType = z.infer<typeof userInfoSchema>;

export default function UpdateProfile() {
  const { data: userInfo } = useGetMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const userInfoForm = useForm<userInfoType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      userInfoForm.reset({
        name: userInfo?.data?.name ?? "",
        address: userInfo?.data?.address ?? "",
      });
    }
  }, [userInfoForm, userInfo]);

  console.log(userInfo);
  const onUserInfoFormSubmit = async (data: userInfoType) => {
    const toastId = toast.loading("Updating Profile..");
    try {
      const result = await updateProfile({
        userId: userInfo?.data?._id,
        payload: data,
      }).unwrap();
      if (result.success) {
        toast.success("Profile Updated Successfully.", { id: toastId });
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
              Update Profile
            </h1>
            <Form {...userInfoForm}>
              <form
                id="userInfo"
                className="space-y-2"
                onSubmit={userInfoForm.handleSubmit(onUserInfoFormSubmit)}
              >
                <FormField
                  control={userInfoForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <Input placeholder="Enter Name" {...field}></Input>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userInfoForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <Input placeholder="Enter Address" {...field}></Input>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div>
              <Button
                form="userInfo"
                type="submit"
                className="w-full mt-4 hover:cursor-pointer"
              >
                Update Info
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
