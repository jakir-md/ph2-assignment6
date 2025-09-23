import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useUpdateWalletMutation } from "@/redux/features/admin/admin.api";

export default function WalletSwitch({
  onChange,
  checked,
}: {
  onChange: (val: boolean) => void;
  checked: boolean;
}) {
  console.log("checked inside switch", checked);
  const id = useId();
  const { data: userInfo } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateStatus] = useUpdateWalletMutation(undefined);

  const handleOnClick = async () => {
    onChange(!checked);
    console.log("handle clicked");
    const toastId = toast.loading("Updating Wallet Status..");
    const statusInfo = { status: "INACTIVE" };
    if (!checked) {
      statusInfo.status = "ACTIVE";
    }
    try {
      const result = await updateStatus({
        phone: userInfo?.data.phone,
        statusInfo,
      }).unwrap();
      if (result.success) {
        toast.success("Wallet Status Updated Successfully.", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onClick={handleOnClick}
          className="hover:cursor-pointer peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative flex items-center justify-center text-center transition-transform duration-300 px-1 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-xs font-medium uppercase">INACTIVE</span>
        </span>
        <span className="peer-data-[state=checked]:text-background pointer-events-none relative flex items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-xs font-medium uppercase">ACTIVE</span>
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
