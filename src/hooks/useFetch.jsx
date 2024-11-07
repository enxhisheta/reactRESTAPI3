import { useState, useEffect } from "react";

const API_URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const API_URL_BOOKS = "https://openlibrary.org/search.json";

const useFetch = (currentPage, itemsPerPage, isAlbumView) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isAlbumView) {
          const response = await fetch(
            `${API_URL_ALBUMS}?_page=${currentPage}&_limit=${itemsPerPage}`
          );
          if (!response.ok) throw new Error("Failed to fetch albums");

          const totalItems = response.headers.get("x-total-count");
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
          const result = await response.json();
          setData(result);
        } else {
          const response = await fetch(
            `${API_URL_BOOKS}?q=crime&fields=key,title,author_name,first_publish_year&limit=${itemsPerPage}&page=${currentPage}&sort=new`
          );
          if (!response.ok) throw new Error("Failed to fetch books");

          const result = await response.json();
          setData(result.docs);
          setTotalPages(Math.ceil(result.numFound / itemsPerPage));
        }
      } catch (err) {
        setError(err.message);
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
