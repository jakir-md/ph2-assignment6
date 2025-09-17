import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A bar chart with a label";

const allMonths = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  totalAmount: {
    label: "Amount ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const quaters = ["1,2,3", "4,5,6", "7,8,9", "10,11,12"];

export function QuaterlyRevenue({
  quaterInfo,
  onChange,
  quaterTotalRevenue,
  role,
}: {
  quaterInfo: { month: number; totalAmount: number }[];
  onChange: (str: string) => void;
  quaterTotalRevenue: string;
  role: string;
}) {
  const chartData = quaterInfo.map((item) => ({
    month: allMonths[item.month],
    totalAmount: item.totalAmount,
  }));

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-between">
          <h1>
            {role === "admin"
              ? "Total Revenue (BDT):"
              : "Total Comission (BDT): "}{" "}
            {quaterTotalRevenue || 0}
          </h1>
          <div>
            {role === "admin" && (
              <Select
                onValueChange={(val) => {
                  const indx = parseInt(val);
                  onChange(quaters[indx]);
                }}
                defaultValue="2"
              >
                <SelectTrigger className="w-full rounded-md">
                  <SelectValue placeholder="Select Quater" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Quater 1</SelectItem>
                  <SelectItem value="1">Quater 2</SelectItem>
                  <SelectItem value="2">Quater 3</SelectItem>
                  <SelectItem value="3">Quater 4</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <BarChart
              accessibilityLayer
              data={chartData}
              height={100}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="totalAmount"
                fill="var(--color-totalAmount)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
