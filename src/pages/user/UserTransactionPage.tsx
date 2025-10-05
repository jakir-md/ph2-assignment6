import TransactionFilter from "@/components/modules/shared/TransactionFilter";
import TransactionTable from "@/components/modules/shared/TransactionTable";

export default function UserTransactionPage() {
  return (
    <div className="mt-4 md:grid grid-cols-4 md:gap-3">
      <div className="w-full col-span-1 max-w-3xl my-3 md:my-0">
        <TransactionFilter role="user"/>
      </div>
      <div className="w-full col-span-3 rounded-md max-w-3xl">
        <TransactionTable limit={10}/>
      </div>
    </div>
  );
}
