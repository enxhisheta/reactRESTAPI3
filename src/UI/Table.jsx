import { useState, useEffect } from "react";
import Pagination from "./Paginations";

const API_URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const API_URL_BOOKS = "https://openlibrary.org/search.json";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlbumView, setIsAlbumView] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

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
  }, [currentPage, isAlbumView]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderTableHeaders = () => (
    <tr>
      {isAlbumView ? (
        <>
          <th>User ID</th>
          <th>Album ID</th>
          <th>Title</th>
        </>
      ) : (
        <>
          <th>Title</th>
          <th>Author</th>
          <th>First Published</th>
        </>
      )}
    </tr>
  );

  const renderTableRows = () => {
    if (isAlbumView) {
      return data.map((album) => (
        <tr key={album.id}>
          <td>{album.userId}</td>
          <td>{album.id}</td>
          <td>{album.title}</td>
        </tr>
      ));
    } else {
      return data.map((book) => (
        <tr key={book.key}>
          <td>{book.title}</td>
          <td>{book.author_name?.[0]}</td>
          <td>{book.first_publish_year}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isAlbumView}
            onChange={() => {
              setIsAlbumView(!isAlbumView);
              setCurrentPage(1);
            }}
          />
          <span className="slider round"></span>
        </label>
        <span>{isAlbumView ? "Albums View" : "Books View"}</span>
      </div>

      <table className="language-table">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Table;
