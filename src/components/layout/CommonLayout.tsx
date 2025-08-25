import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function CommonLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div><Navbar /></div>
      <div className="grow-1"><Outlet /></div>
      <div><Footer /></div>
    </div>
  );
}
