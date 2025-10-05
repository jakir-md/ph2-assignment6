import { CashInForm } from "@/components/modules/agent/CashInForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function CashInPage() {
  return (
    <Card className="mt-4 rounded-md max-w-2xl min-w-[340px] mx-auto">
      <CardContent>
        <CashInForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
