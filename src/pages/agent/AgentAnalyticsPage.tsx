import { useAgentComissionQuery } from "@/redux/features/user/user.api";

import { useState } from "react";
import { QuaterlyRevenue } from "@/components/modules/admin/QuaterlyRevenue";
import Wallet from "@/components/modules/shared/Wallet";
import TransactionTable from "@/components/modules/shared/TransactionTable";

export default function AgentAnalyticsPage() {
  const [currentQuater, setCurrentQuater] = useState(
    "1,2,3,4,5,6,7,8,9,10,11,12"
  );
  const { data, isLoading } = useAgentComissionQuery({ currentQuater });
  console.log("Agent Comission Info", data?.data);
  return (
    <div className="">
      <Wallet />
      <div className="rounded-md mt-4 max-w-3xl inset-0 mx-auto">
        {!isLoading && (
          <QuaterlyRevenue
            onChange={setCurrentQuater}
            quaterInfo={data?.data[0]?.quaterWise}
            quaterTotalRevenue={data?.data[0]?.overAll[0]?.totalAmount}
            role={"agent"}
          />
        )}
      </div>
      <div className="mt-10">
        <TransactionTable limit={10} />
      </div>
    </div>
  );
}
