import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between w-full p-4 absolute z-10">
      <h1 className="text-red-600 font-bold text-4xl">NETFLIX</h1>
      <div className="flex gap-4">
        <Link to="/sign-in" className="p-2 text-white">
          Sign in
        </Link>
        <Link to="/sign-in" className="p-2 bg-red-600 text-white px-4">
          Sign Up
        </Link>
      </div>
    </header>
  );
};
