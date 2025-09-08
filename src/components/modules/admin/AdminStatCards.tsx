import { IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AdminStatCards({
  transactionInfo,
}: {
  transactionInfo: {
    total: number;
    average: number;
    totalAmount: number;
    averageAmount: number;
  };
}) {
  const { total, average, totalAmount, averageAmount } = transactionInfo;
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4 w-full mb-4">
      <Card className="@container/card py-3 pb-0 rounded-md">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
      <Card className="@container/card py-3 pb-0 rounded-md">
        <CardHeader>
          <CardDescription>Trnx count/day (Aprox)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {average}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
      <Card className="@container/card py-3 pb-0 rounded-md">
        <CardHeader>
          <CardDescription>Transaction Amount</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalAmount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
      <Card className="@container/card py-3 pb-0 rounded-md">
        <CardHeader>
          <CardDescription>Trnx amount / day (Aprox)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {averageAmount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +3.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="m-0 p-0"></CardFooter>
      </Card>
    </div>
  );
}
