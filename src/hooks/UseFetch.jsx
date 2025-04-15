import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../constants";

const UseFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const config = {
        method: "GET",
        url: `${API_URL}${endpoint}`,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
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
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default UseFetch;
