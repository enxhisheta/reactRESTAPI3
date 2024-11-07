import { useState } from "react";
import Pagination from "./Paginations";
import ToggleSwitch from "./ToggleApi";
import useFetch from "../hooks/useFetch";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlbumView, setIsAlbumView] = useState(true);
  const itemsPerPage = 10;

  const { data, loading, error, totalPages } = useFetch(
    currentPage,
    itemsPerPage,
    isAlbumView
  );

  const handleToggle = () => {
    setIsAlbumView(!isAlbumView);
    setCurrentPage(1);
  };

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
      <ToggleSwitch isAlbumView={isAlbumView} onToggle={handleToggle} />
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
