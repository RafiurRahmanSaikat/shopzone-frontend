import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_BACKEND } from "../constants";

const useFetch = (endpoint, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const config = {
          method: method.toUpperCase(),
          url: `${BASE_URL_BACKEND}${endpoint}`,
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          data: body, // Always include body if provided
        };

        const response = await axios(config);
        setData(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with error status
          setError(err.response.data.message || err.response.statusText);
        } else if (err.request) {
          // Request was made but no response
          setError("No response from server");
        } else {
          // Other errors
          setError(err.message || "An error occurred while fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, method, body]);

  return { data, loading, error };
};

export default useFetch;
