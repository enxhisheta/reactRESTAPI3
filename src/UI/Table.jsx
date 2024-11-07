import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Pagination from "./Paginations";

const API_URL = "https://jsonplaceholder.typicode.com/albums";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {
    data: albums,
    loading,
    error,
    totalPages,
  } = useFetch(API_URL, currentPage, itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <table className="language-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Album ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.userId}</td>
              <td>{album.id}</td>
              <td>{album.title}</td>
            </tr>
          ))}
        </tbody>
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
