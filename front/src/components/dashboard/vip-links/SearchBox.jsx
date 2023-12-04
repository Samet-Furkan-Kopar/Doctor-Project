const SearchBox = ({setSearchKey}) => {
  return (
    <form className="d-flex flex-wrap align-items-center my-2">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Arama Yap "
        aria-label="Search"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className=" my-2 my-sm-0" type="button">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
