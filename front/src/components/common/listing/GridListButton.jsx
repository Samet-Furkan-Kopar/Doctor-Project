import { useDispatch, useSelector } from "react-redux";
import { toggleGridAndList } from "../../../features/filter/filterSlice";

const GridListButton = () => {
  const { isGridOrList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <ul className="h-100 w-100 d-flex align-items-center">
      <li
        className={`list-inline-item ${!isGridOrList ? "active" : ""}`}
        onClick={() => dispatch(toggleGridAndList(false))}
      >
        <a>
          <span className="fa fa-th-large"></span>
        </a>
      </li>
      {/* End li */}

      <li
        className={`list-inline-item ${isGridOrList ? "active" : ""}`}
        onClick={() => dispatch(toggleGridAndList(true))}
      >
        <a>
          <span className="fa fa-th-list"></span>
        </a>
      </li>
      {/* End li */}
    </ul>
  );
};

export default GridListButton;
