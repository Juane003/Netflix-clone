import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../firebase/auth";

export const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.email) return;
    if (!user.password) return;
    await createUser(user.email, user.password);
    navigate("/");
  };

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => {
      return { ...prev, email: event.target.value };
    });

  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => {
      return { ...prev, password: event.target.value };
    });

  return (
    <>
      <div className="h-screen w-full">
        <img
          className="absolute hidden h-full w-full object-cover sm:block"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        />
        <div className=" fixed top-0 left-0 h-screen w-full bg-black/60">
          <div className="fixed z-50 w-full px-4 py-24">
            <div className="mx-auto h-[600px] max-w-[450px] bg-black/75 text-white">
              <div className="mx-auto max-w-[320px] py-16">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <form
                  className="flex w-full flex-col py-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="my-2 rounded bg-gray-700 p-3"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailOnChange}
                  />
                  <input
                    className="my-2 rounded bg-gray-700 p-3"
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordOnChange}
                  />
                  <button className="my-6 rounded bg-red-600 py-3 font-bold">
                    Sign Up
                  </button>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p>
                      <input type="checkbox" className="mr-2" />
                      Remember Me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <p className="py-8">
                    <span className="text-gray-600">
                      Already suscribed to Netflix?
                    </span>{" "}
                    <Link to="/sign-in">Sign In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
