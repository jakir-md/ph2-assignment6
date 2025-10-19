import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import SendMoneyImage from "@/components/modules/home/SendMoneyImage";
import { motion } from "framer-motion";
import banner from "../../src/assets/images/bg-hero.png";
import { useGetMeQuery } from "@/redux/features/user/user.api";
export default function Home() {
  const { data: userData } = useGetMeQuery(undefined);
  return (
    <section className="mt-4">
      <div className="container">
        <div className="relative">
          <div>
            <img
              src={banner}
              className="md:h-[500px] h-[500px] w-full"
              alt=""
            />
          </div>
          <div className="flex absolute top-10 md:top-30 md:left-20 items-center text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 30 }}
              transition={{ duration: 2 }}
              className="mx-auto flex flex-col items-center text-center"
            >
              <h1 className="my-3 text-white mt-6 text-center text-pretty text-3xl font-bold lg:text-6xl">
                Your Digital Wallet
              </h1>
              <h1 className="my-5 mt-0 md:mt-3 text-white text-center text-pretty text-3xl font-bold lg:text-6xl">
                for a Cashless Future
              </h1>
              <Button asChild id="register" className=" sm:w-auto">
                {!userData && <Link to="/register">Get Started</Link>}
              </Button>
            </motion.div>
          </div>
          <div className="absolute md:top-20 md:left-220 top-60 left-35">
            <SendMoneyImage />
          </div>
        </div>
      </div>
    </section>
  );
}
