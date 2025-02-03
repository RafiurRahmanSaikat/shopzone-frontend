import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_BACKEND } from "../constants";

const useFetch = (endpoint, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function inside the useEffect hook
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
          data: body,
        };

        const response = await axios(config);
        setData(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || err.response.statusText);
        } else if (err.request) {
          setError("No response from server");
        } else {
          setError(err.message || "An error occurred while fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, [endpoint, method, body]); // Only re-run the effect if these dependencies change

  return { data, loading, error };
};

export default useFetch;
