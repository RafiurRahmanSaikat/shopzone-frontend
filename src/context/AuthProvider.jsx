import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL_BACKEND } from "../constants";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const saveToken = (jwtToken, refreshToken) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(jwtToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL_BACKEND}/accounts/users/me/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data);
      // console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching profile:", error);
      removeToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL_BACKEND}/token/`,
        credentials,
      );
      console.log(response);
      saveToken(response.data.access, response.data.refresh);
      toast.success("Login successful!");
      await fetchProfile();
      return response.status;
    } catch (error) {
      toast.error("Invalid credentials");
      return { status: error.response?.status || 500 };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL_BACKEND}/accounts/users/`,
        formData,
      );
      toast.success("Signup successful!");

      return response;
    } catch (error) {
      toast.error("Signup failed. Try again.");
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post(
          `${BASE_URL_BACKEND}/logout/`,
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      removeToken();
      toast.info("Logged out successfully!");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
