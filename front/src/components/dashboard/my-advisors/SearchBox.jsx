import { useState } from "react";
const SearchBox = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);

  const inputChanged = (e) => {
    setInputValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      onInputChange(inputValue);
    }, 1000);

    setTimer(newTimer);
  };
  return (
    <form className="d-flex flex-wrap align-items-center my-2">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Ara"
        aria-label="Search"
        onChange={inputChanged}
      />
      <button className=" my-2 my-sm-0" type="submit">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
