import React from "react";
import { Pagination } from "react-bootstrap";

export default function BTPagination({
  canPreviousPage,
  canNextPage,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageIndex
}) {
  return (
    <div className="d-flex">
      <Pagination>
        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
      </Pagination>
    </div>
  );
}
