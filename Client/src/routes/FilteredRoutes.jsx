import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export const ProtectedRoute = ({ element }) => {
  const session = useOutletContext();
  console.log("sessFilter :", session);
  return session.data ? (
    element || <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export const PublicRoute = ({ element }) => {
  const session = useOutletContext();
  // return session.data ? <Navigate to="/" replace /> : element || <Outlet />;
  return session.data ? element || <Outlet /> : element || <Outlet />;
};
