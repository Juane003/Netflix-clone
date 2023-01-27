import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const RootLayout = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};