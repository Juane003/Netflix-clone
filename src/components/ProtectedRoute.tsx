import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { currentUser } = useAuthContext();

  if (currentUser === null) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
