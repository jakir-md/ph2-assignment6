import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function CommonLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background"><Navbar/></div>
      <div className="grow-1"><Outlet /></div>
      <div className="px-5 md:mt-0 mt-25"><Footer /></div>
    </div>
  );
}
