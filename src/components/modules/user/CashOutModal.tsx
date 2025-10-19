/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { sendMoneyFormType } from "./SendMoneyForm";
import { Button } from "@/components/ui/button";
import {
  useCashOutMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function CashOutModal({
  open,
  formInfo,
  onOpenChange,
}: {
  open: boolean;
  formInfo: sendMoneyFormType & { fee: string; role: string };
  onOpenChange: (str: boolean) => boolean;
}) {
  const [cashOut] = useCashOutMutation();
  const navigate = useNavigate();
  const handleConfirm = async () => {
    const toastId = toast.loading("Processing cashout..");
    try {
      const result = await cashOut(formInfo).unwrap();
      if (result.success) {
        toast.success("Cash Out Successfull.", { id: toastId });
        navigate(`/${formInfo.role}/dashboard`);
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
              {`Agent Phone: `}{" "}
              <span className="font-semibold">{`${formInfo.agentPhone}`}</span>
            </span>
            <span className="text-start">
              Amount: <span>{formInfo.amount}</span>
            </span>
            <span className="text-start">
              Fee: <span>{formInfo.fee}</span>
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
