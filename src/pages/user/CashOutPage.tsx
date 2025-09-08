import { CashOutForm } from "@/components/modules/user/CashOutForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function CashOutPage() {
  return (
    <Card className="rounded-md max-w-2xl min-w-[340px] mx-auto">
      <CardContent>
        <CashOutForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
