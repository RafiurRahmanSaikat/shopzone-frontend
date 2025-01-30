import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_BACKEND } from "../constants";

const useFetch = (endpoint, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method,
          url: `${BASE_URL_BACKEND}${endpoint}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: body,
        });

        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body, token]);

  return { data, error, loading };
};

export default useFetch;
