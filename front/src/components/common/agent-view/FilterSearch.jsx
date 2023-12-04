import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addCity,
  addListen,
  addName,
} from "../../../features/agent/agentSlice";

const FilterSearch = () => {
  const { name, category, city } = useSelector((state) => state.agent) || {};

  const [getName, setName] = useState(name);
  const [getCategory, setCategory] = useState(category);
  const [getCity, setCity] = useState(city);
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();

  // name
  useEffect(() => {
    dispatch(addName(getName));
  }, [dispatch, getName]);

  // category
  useEffect(() => {
    dispatch(addCategory(getCategory));
  }, [dispatch, getCategory]);

  // city
  useEffect(() => {
    dispatch(addCity(getCity));
  }, [dispatch, getCity]);

  const clearHandler = () => {
    setName("");
    setCategory("");
    setCity("");
    dispatch(addListen(""));
  };

  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter Agent Name"
            onChange={(e) => setName(e.target.value)}
            value={getName}
          />
        </div>
      </li>
      {/* End .search_area */}

      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="selectpicker w100 show-tick form-select"
            >
              <option value="">All Categories</option>
              <option>Broker</option>
              <option>Agent</option>
            </select>
          </div>
        </div>
      </li>
      {/* End Categories search_area */}

      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCity(e.target.value)}
              className="selectpicker w100 show-tick form-select"
            >
              <option value="">All Cities</option>
              <option>Atlanta</option>
              <option>Florida</option>
              <option>Los Angeles</option>
              <option>Miami</option>
              <option>New York</option>
              <option>Orlando</option>
            </select>
          </div>
        </div>
      </li>
      {/* End City search_area */}

      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Clear
          </button>
        </div>
      </li>
      {/* End submit serch button */}
    </ul>
  );
};

export default FilterSearch;