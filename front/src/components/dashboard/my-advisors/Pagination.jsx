import { useEffect, useState } from "react";

const Pagination = ({ pageSize, onPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPage(currentPage);
  }, [currentPage]);

  return (
    <ul className="page_navigation">
      <li
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((state) => state - 1);
          }
        }}
      >
        <p className="page-link" style={{ cursor: "pointer" }}>
          <span className="flaticon-left-arrow"></span>
        </p>
      </li>
      {new Array(pageSize).fill(0).map((_, i) => (
        <li
          className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          key={i}
          onClick={() => {
            setCurrentPage(i + 1);
          }}
        >
          <span className="page-link" style={{ cursor: "pointer" }}>
            {i + 1}
          </span>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === pageSize ? "disabled" : ""}`}
        onClick={() => {
          if (currentPage !== pageSize) {
            setCurrentPage((state) => state + 1);
          }
        }}
      >
        <p className="page-link" style={{ cursor: "pointer" }}>
          <span className="flaticon-right-arrow"></span>
        </p>
      </li>
    </ul>
  );
};

export default Pagination;
