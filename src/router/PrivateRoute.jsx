import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../components";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (isAuthenticated) return children;
  if (loading) return <Loading />;
  if (!loading && !isAuthenticated && !token)
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
