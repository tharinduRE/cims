import React from "react";
import { Badge } from "react-bootstrap";
import BTablePagination from "../../components/table/BTablePagination";
import actionFormatter from "./actionFormatter";
import { formatDate } from "../../_helpers/DateFormatHelper";

export default function ItemsTable({ store }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "itemName",
        Cell: ({ value }) => {
          return (
            <div>
              <span className="font-weight-bolder">{value}</span>
              {/*  <span className="text-muted font-weight-bold d-block">
                CAS : {row.original.casNumber}
              </span> */}
            </div>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "totalQuantity",
        Cell: ({ value }) => {
          return <Badge variant="dark">{value}</Badge>;
        },
      },
      {
        Header: "Container",
        accessor: "itemCapacity",
        Cell: ({ row, value }) => {
          return (
            <Badge variant="info">
              {value} {row.original.storageUnit}
            </Badge>
          );
        },
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice",
        Cell: ({ value }) => {
          return <>Rs. {value.toFixed(2)}</>;
        },
      },
      {
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: ({ value }) => {
          return formatDate(value);
        },
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }) => {
          return actionFormatter({
            row,
          });
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <BTablePagination
      columns={columns}
      dataUrl={`/items?storeId=${store}`}
      countUrl={`/items/count?storeId.equals=${store}`}
      pagination
    />
  );
}
