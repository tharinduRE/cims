import React from "react";
import { AuthContext } from "../pages/auth/AuthProvider";

const AdminRole = () => {
  const { state: AuthState } = React.useContext(AuthContext);
  const authUser = AuthState.user;
  if (authUser.authorities.includes("ROLE_ADMIN")) return true;
  return false;
};

export const isAdmin = () => {
  return AdminRole();
};
