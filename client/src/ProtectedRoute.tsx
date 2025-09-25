import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./State/Store";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: ["ROLE_SELLER", "ROLE_ADMIN"];
}

const ProtectedRoute = ({ element, allowedRole }: { element: JSX.Element, allowedRole: "ROLE_SELLER" | "ROLE_ADMIN" }) => {
  const jwt = localStorage.getItem("jwt");
  const role = localStorage.getItem("role") as "ROLE_SELLER" | "ROLE_ADMIN" | null;

  if (!jwt || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;