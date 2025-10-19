import { AdminStatCards } from "@/components/modules/admin/AdminStatCards";
import { QuaterlyRevenue } from "@/components/modules/admin/QuaterlyRevenue";
import { RegisteredUsersStat } from "@/components/modules/admin/RegisteredUsersStat";
import { SubscribersChart } from "@/components/modules/admin/SubscribersChart";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAnalyticsQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";

export default function AdminAnalyticsPage() {
  const [currentQuater, setCurrentQuater] = useState<string>("7, 8,9");
  const { data, isLoading } = useAdminAnalyticsQuery({ currentQuater });

  return (
    <div className="mt-4">
      {isLoading ? (
        <div>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
            <Skeleton className="h-[100px]"></Skeleton>
            <Skeleton className="h-[100px]"></Skeleton>
            <Skeleton className="h-[100px]"></Skeleton>
            <Skeleton className="h-[100px]"></Skeleton>
          </div>
          <div className="grid mt-4 md:grid-cols-2 gap-4 grid-cols-1">
            <Skeleton className="h-[350px]"></Skeleton>
            <Skeleton className="h-[350px]"></Skeleton>
          </div>
        </div>
      ) : (
        <>
          <AdminStatCards transactionInfo={data?.data.transactionInfo} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SubscribersChart subscriberInfo={data?.data.subscriberInfo} />
            <QuaterlyRevenue
              role="admin"
              quaterInfo={data?.data.quaterInfo[0]?.quaterWise}
              onChange={setCurrentQuater}
              quaterTotalRevenue={
                data?.data.quaterInfo[0]?.overAll[0]?.totalAmount
              }
            />
          </div>
          <div className="mt-4">
            <RegisteredUsersStat />
          </div>
        </>
      )}
    </div>
  );
}
