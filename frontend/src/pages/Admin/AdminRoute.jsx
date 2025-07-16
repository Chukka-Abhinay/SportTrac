import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <>
      <AdminMenu></AdminMenu>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;
