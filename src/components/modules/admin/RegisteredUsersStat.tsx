/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { DatePickerFrom } from "@/utils/DatePickerFrom";
import { DatePickerTo } from "@/utils/DatePickerTo";
import { useRegisteredUsersQuery } from "@/redux/features/admin/admin.api";
import { setFromDate, setToDate } from "@/redux/features/admin/adminSlice";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  agents: {
    label: "Agents",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RegisteredUsersStat() {
  const selector = useSelector;
  const { fromDate, toDate } = selector(
    (state: any) => state.adminAnalyticsReducer
  );

  const { data } = useRegisteredUsersQuery({ fromDate, toDate });
  console.log(data);
  return (
    <Card className="pt-0 rounded-md mb-5">
      <CardHeader className="flex items-between gap-2 space-y-0 border-b py-5 md:flex-row flex-col">
        <div className="grid flex-1 gap-1">
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>Showing total users</CardDescription>
        </div>
        <div className="flex gap-2">
          <DatePickerFrom
            title="From"
            fromDate={fromDate}
            setFromDate={setFromDate}
            after={new Date(toDate) as Date}
          />
          <DatePickerTo
            title="To"
            toDate={toDate}
            setToDate={setToDate}
            before={new Date(fromDate) as Date}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data?.data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-agents)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-agents)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="agents"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-agents)"
              stackId="a"
            />
            <Area
              dataKey="users"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-users)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent payload={undefined} />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
