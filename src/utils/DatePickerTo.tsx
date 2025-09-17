import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePickerTo({
  title,
  toDate,
  setToDate,
  before,
}: {
  title: string;
  toDate: string;
  setToDate: (date: string) => UnknownAction;
  before: Date;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(new Date(toDate));
  const [value, setValue] = React.useState(formatDate(new Date(toDate)));
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 py-0">
        {title}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              let tempDate = new Date().toISOString();
              if (date) {
                tempDate = date.toISOString();
              }
              dispatch(setToDate(tempDate));
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={
                new Date(new Date().setDate(new Date(toDate).getDate() - 1))
              }
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                let tempDate = new Date().toISOString();
                if (date) {
                  tempDate = date.toISOString();
                }
                dispatch(setToDate(tempDate));
                setValue(formatDate(date));
                setOpen(false);
              }}
              disabled={{ after: new Date(), before: new Date(before) }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
