import { useState, useEffect } from "react";

const API_URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const API_URL_POSTS = "https://jsonplaceholder.typicode.com/posts";

const useFetch = (currentPage, itemsPerPage, isAlbumView) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl =
          isAlbumView === "albums" ? API_URL_ALBUMS : API_URL_POSTS;
        const response = await fetch(
          `${apiUrl}?_page=${currentPage}&_limit=${itemsPerPage}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${isAlbumView === "albums" ? "albums" : "posts"}`
          );
        }

        const totalItems = response.headers.get("x-total-count");
        setTotalPages(Math.ceil(totalItems / itemsPerPage));

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
        console.log(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, isAlbumView]);

  return { data, loading, error, totalPages };
};

export default useFetch;
