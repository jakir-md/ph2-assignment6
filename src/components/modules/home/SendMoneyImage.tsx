import sendmoney from "../../../assets/images/sendmoney1.png";
import { motion } from "framer-motion";
export default function SendMoneyImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: -50 }}
      transition={{ duration: 2 }}
      className=""
    >
      <img src={sendmoney} alt="" />
    </motion.div>
  );
}
