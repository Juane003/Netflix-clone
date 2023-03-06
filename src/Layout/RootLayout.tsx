import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <Outlet />
    </div>
  );
};
