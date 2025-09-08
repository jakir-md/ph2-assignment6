import { useId } from "react";
import { OTPInput } from "input-otp";
import type { SlotProps } from "input-otp";

import { cn } from "@/lib/utils";

interface PinInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function PinInput({ value, onChange }: PinInputProps) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        id={id}
        containerClassName="flex items-center ml-12 gap-3 has-disabled:opacity-50"
        maxLength={5}
        value={value}
        onChange={onChange}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      ></p>
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div className="text-xl">●</div>}
    </div>
  );
}
