import React from "react";
import { Table } from "react-bootstrap";
import { useTable, usePagination } from "react-table";
import BTPagination from "./BTPagination";

export default function DataTable({ columns, data, pagination}) {
  const {
    getTableProps,
    headers,
    rows,
    prepareRow,

    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // eslint-disable-next-line no-unused-vars
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5, pageIndex: 0 },
      manualPagination: true,
      pageCount: 10,
    },
    usePagination
  );

  const paginationProps = {
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    pageIndex,
  };

  const paginationComponent = () => {
    if (pagination) return <BTPagination {...paginationProps} />;
  };
  // Render the UI for your table
  return (
    <>
      <Table
        hover
        responsive
        className="table-head-custom table-vertical-center overflow-hidden"
        {...getTableProps()}
      >
        <thead>
          <tr>
            {headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {paginationComponent()}
    </>
  );
}
