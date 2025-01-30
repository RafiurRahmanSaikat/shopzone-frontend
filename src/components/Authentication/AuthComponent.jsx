import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const handleToggle = () => {
    navigate(isLogin ? "/signup" : "/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl">
        <div className="relative flex h-full flex-col md:h-auto md:flex-row">
          <div
            className={`relative z-10 flex w-full flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white transition-all duration-500 ease-in-out md:w-1/2 md:p-12 ${isLogin ? "md:translate-x-0" : "md:translate-x-full"}`}
          >
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="mb-6 text-center text-base md:mb-8 md:text-lg">
              {isLogin
                ? "Enter your personal details to create account"
                : "Already have an account? Sign in to continue"}
            </p>
            <button
              onClick={handleToggle}
              className="rounded-full border-2 border-white px-6 py-2 font-semibold transition-all duration-300 hover:bg-white hover:text-purple-600 md:px-10"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>

          <div
            className={`relative w-full bg-white p-6 transition-all duration-500 ease-in-out md:w-1/2 md:p-12 ${isLogin ? "translate-y-0 md:translate-x-0" : "-translate-y-0 md:-translate-x-full md:translate-y-0"}`}
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:mb-6 md:text-3xl">
              {isLogin ? "Sign In to Account" : null}
            </h2>
            {isLogin ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
