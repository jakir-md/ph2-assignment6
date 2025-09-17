/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCashInMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { cashInFormType } from "./CashInForm";

export default function CashInModal({
  open,
  formInfo,
  onOpenChange,
}: {
  open: boolean;
  formInfo: cashInFormType & { comission: string; role: string };
  onOpenChange: (str: boolean) => boolean;
}) {
    const [cashIn] = useCashInMutation();
  const navigate = useNavigate();
  const handleConfirm = async () => {
    const toastId = toast.loading("Processing cash in..");
    try {
      const result = await cashIn({formInfo, phone:formInfo.userPhone}).unwrap();
      if (result.success) {
        toast.success("Cash in Successfull.", { id: toastId });
        navigate(`/${formInfo.role}/dashboard/overview`);
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
              {`User Phone: `}{" "}
              <span className="font-semibold">{`${formInfo.userPhone}`}</span>
            </span>
            <span className="text-start">
              Amount: <span>{formInfo.amount}</span>
            </span>
            <span className="text-start">
              Comission: <span>{formInfo.comission}</span>
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
