import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthRoute = ({ children }) => {
  const token = Cookies.get("token");
  if (!token || token === "undefined") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;
