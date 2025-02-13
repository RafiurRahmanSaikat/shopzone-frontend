import axios from "axios";
import { BASE_URL_BACKEND } from "../constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error Response: ", error.response);
      if (error.response.data) {
        console.error(
          `Error: ${error.response.data.message || "Something went wrong"}`,
        );
      }
    } else {
      console.error("Error: ", error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const handlePostRequest = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const handlePutRequest = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const handleDeleteRequest = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const handlePatchRequest = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
