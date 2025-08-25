import { Button } from "@/components/ui/button";
import { IoMdPaperPlane } from "react-icons/io";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BillPay() {
  return (
    <Card className="w-full max-w-sm rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold">Pay Electricity Bill</CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Biller ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="81 * * * * * * 35"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">PIN</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter 8 digit pin"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="hover:cursor-pointer flex gap-2">
          <div>
            <IoMdPaperPlane />
          </div>
          <h1>Pay Now</h1>
        </Button>
      </CardFooter>
    </Card>
  );
}
