import { jwtDecode } from "jwt-decode";
import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = useSelector((state: any) => state.jwt);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const decoded: any = jwtDecode(token);
  // console.log(decoded);
  // if (allowedRoles && !allowedRoles.includes(decoded.applicantType))
  //   return <Navigate to="/unauthorized" />;
  return children;
};

export default ProtectedRoute;
