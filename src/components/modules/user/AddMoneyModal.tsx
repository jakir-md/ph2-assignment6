/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAddMoneyMutation } from "@/redux/features/user/user.api";
import type { addMoneyFormType } from "./AddMoneyForm";

export default function AddMoneyModal({
  open,
  formInfo,
  onOpenChange,
  phone,
}: {
  open: boolean;
  formInfo: addMoneyFormType;
  onOpenChange: (str: boolean) => boolean;
  phone: string;
}) {
  const [addMoney] = useAddMoneyMutation();
  const handleConfirm = async () => {
    const toastId = toast.loading("Processing add money..");
    console.log("formInfo", formInfo);
    try {
      const result = await addMoney({ payload: formInfo, phone }).unwrap();
      if (result.success) {
        window.location.href = result.data.paymentURL;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed: ${error.data.message}`, { id: toastId });
    }
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[20rem] rounded-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col justify-start p-0 mt-5">
            <span className="text-start">
              Amount: <span>{formInfo.amount}</span>
            </span>
          </div>
        </DialogHeader>
        <Button
          onClick={handleConfirm}
          type="submit"
          className="hover:cursor-pointer"
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
