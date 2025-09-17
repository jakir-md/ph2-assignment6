import Wallet from "@/components/modules/shared/Wallet";
import TransactionTable from "@/components/modules/shared/TransactionTable";

export default function UserAnalyticsPage() {
  return (
    <div>
      <Wallet />
      <div className="mt-5">
        <TransactionTable limit={5}/>
      </div>
    </div>
  );
}
