import React from "react";
const SearchUser = ({search, setSearch}) => {
  return (
    <form className="form-inline d-flex">
      <input
        className="form-control"
        type="search"
        placeholder="Ara"
        aria-label="Ara"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required

      />
      <button className="btn" type="button">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchUser;
