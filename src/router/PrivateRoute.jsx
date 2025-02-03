import { Loading } from "@components";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (user) return children;
  if (loading) return <Loading />;
  if (!loading && !user && !token)
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
