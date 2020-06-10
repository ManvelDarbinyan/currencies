import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ handlePaginationClick, totalPages, page }) => {
  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        onClick={() => handlePaginationClick("previous")}
        disabled={page === 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        {page} of {totalPages}
      </span>
      <button
        className="Pagination-button"
        onClick={() => handlePaginationClick("next")}
        disabled={page === totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  handlePaginationClick: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
