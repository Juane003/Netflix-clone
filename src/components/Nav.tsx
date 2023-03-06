import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { signOutUser } from "../firebase/auth";

export const Nav = () => {
  const { currentUser } = useAuthContext();
  return (
    <header className="absolute z-10 flex w-full justify-between p-4">
      <Link to="/">
        <h1 className="text-4xl font-bold text-red-600">NETFLIX</h1>
      </Link>
      <div className="flex gap-4">
        {currentUser === null ? (
          <>
            <Link to="/sign-in" className="p-2 text-white">
              Sign in
            </Link>
            <Link to="/sign-up" className="bg-red-600 p-2 px-4 text-white">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/account" className="p-2 text-white">
              Account
            </Link>
            <button
              onClick={signOutUser}
              className="bg-red-600 p-2 px-4 text-white"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
};
