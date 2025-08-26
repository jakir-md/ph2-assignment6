import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BillPay from "./BillPay";
import { Link } from "react-router";

// interface Hero1Props {
//   badge?: string;
//   heading: string;
//   description: string;
//   buttons?: {
//     primary?: {
//       text: string;
//       url: string;
//     };
//     secondary?: {
//       text: string;
//       url: string;
//     };
//   };
//   image: {
//     src: string;
//     alt: string;
//   };
// }

export default function Home() {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              Your one time helper
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              DigiWallet
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Another Description
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/login">
                  Login
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <BillPay />
          </div>
        </div>
      </div>
    </section>
  );
}
