import { Loading } from "@components";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading, token } = useContext(AuthContext);
  if (loading) return <Loading />;
  if (!token && !user?.is_authenticated) return <Navigate to="/login" />;
  if (token && user?.is_authenticated && !loading) return children;
};

export default PrivateRoute;
