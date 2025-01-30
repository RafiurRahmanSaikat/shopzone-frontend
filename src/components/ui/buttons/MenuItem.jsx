// src/components/MenuItem.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ icon, label, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;
