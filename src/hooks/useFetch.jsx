import { useState, useEffect } from "react";

const useFetch = (url, currentPage, itemsPerPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const totalItems = response.headers.get("x-total-count");
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, itemsPerPage]);

  return { data, loading, error, totalPages };
};

export default useFetch;
