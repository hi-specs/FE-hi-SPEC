import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login"];

  const tokenProtected = [
    "/profile",
    "/profile-edit",
    "/wishlist",
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  const roleAdminProtected = [
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  const roleUserProtected = [
    "/",
    "/products",
    "/categories",
    "/compare",
    "/categories",
    "/wishlist",
    "/detail-product",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (tokenProtected.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleAdminProtected.includes(pathname)) {
      if (user.user?.name !== "admin") return <Navigate to="/" />;
    }
  }

  if (roleUserProtected.includes(pathname)) {
    if (user.user?.name === "admin") return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
