import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const RoleBasedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  let permision = roles?.includes(user?.role);
  return permision ? children : <Navigate to="/noPermision" />;
};

export default RoleBasedRoute;
