import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Update the page using the setPage prop
    }
  };

  return (
    <ul className="page_navigation">
      <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(page - 1)} // Decrease page by 1
        >
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${pageNumber === page ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(pageNumber)} // Set the new page
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li
        className={`page-item ${page === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(page + 1)} // Increase page by 1
        >
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
