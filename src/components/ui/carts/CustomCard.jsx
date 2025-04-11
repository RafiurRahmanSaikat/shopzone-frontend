import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-xl bg-white shadow-lg dark:bg-zinc-900 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div
      className={`border-b border-gray-200 p-6 dark:border-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-2xl font-bold text-gray-800 dark:text-zinc-200 ${className}`}
    >
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }) => {
  return (
    <div
      className={`border-t border-gray-200 p-6 dark:border-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
};
