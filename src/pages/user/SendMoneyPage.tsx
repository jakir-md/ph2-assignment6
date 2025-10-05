import { SendMoneyForm } from "@/components/modules/user/SendMoneyForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function SendMoneyPage() {
  return (
    <Card className="mt-4 rounded-md max-w-2xl min-w-[340px] mx-auto">
      <CardContent>
        <SendMoneyForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
