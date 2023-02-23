import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "admin" ? children : <Navigate to="/" />;
};

export default PrivateRoutes;
