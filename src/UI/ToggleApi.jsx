/* eslint-disable react/prop-types */
const ToggleApi = ({ isAlbumView, onToggle }) => {
  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" checked={isAlbumView} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <span>{isAlbumView ? "Albums View" : "Books View"}</span>
    </div>
  );
};

export default ToggleApi;
