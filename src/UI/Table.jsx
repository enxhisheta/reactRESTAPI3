import { useState } from "react";
import Pagination from "./Paginations";
// import ToggleSwitch from "./ToggleApi";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useFetch from "../hooks/useFetch";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlbumView, setIsAlbumView] = useState("albums");
  const itemsPerPage = 10;

  const { data, loading, error, totalPages } = useFetch(
    currentPage,
    itemsPerPage,
    isAlbumView
  );

  const handleToggle = (newValue) => {
    console.log(newValue);
    if (newValue.target.value !== null) {
      setIsAlbumView(newValue.target.value);
      setCurrentPage(1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderHeader = () => (
    <h2>{isAlbumView === "albums" ? "Albums" : "Posts"}</h2>
  );

  const renderTableHeaders = () => (
    <tr>
      {isAlbumView === "albums" ? (
        <>
          <th>User ID</th>
          <th>Album ID</th>
          <th>Title</th>
        </>
      ) : (
        <>
          <th>User ID</th>
          <th>Post Title</th>
          <th>Post Details</th>
          <th>Post Body</th>
        </>
      )}
    </tr>
  );

  const renderTableRows = () => {
    if (isAlbumView === "albums") {
      return data.map((album) => (
        <tr key={album.id}>
          <td>{album.userId}</td>
          <td>{album.id}</td>
          <td>{album.title}</td>
        </tr>
      ));
    } else {
      return data.map((post) => (
        <tr key={post.id}>
          <td>{post.userId}</td>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      {renderHeader()}
      {/* <ToggleSwitch isAlbumView={isAlbumView} onToggle={handleToggle} /> */}
      <ToggleButtonGroup
        value={isAlbumView}
        exclusive
        onChange={handleToggle}
        aria-label="table"
        sx={{
          "& .MuiToggleButton-root": {
            color: "white",
          },
          "& .MuiToggleButtonGroup-clicked": {
            color: "purple",
          },
        }}
      >
        <ToggleButton value="albums">Albums</ToggleButton>
        <ToggleButton value="posts">Posts</ToggleButton>
      </ToggleButtonGroup>

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
