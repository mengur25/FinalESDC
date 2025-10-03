import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRole: "ROLE_SELLER" | "ROLE_ADMIN";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const jwt = localStorage.getItem("jwt");
  const role = localStorage.getItem("role") as "ROLE_SELLER" | "ROLE_ADMIN" | null;

  if (!jwt || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
