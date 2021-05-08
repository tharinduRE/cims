import React from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BTablePagination from "../../components/table/BTablePagination";
import { authStoresEquals } from "../../_helpers";

export default function ItemLowTable() {

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Item Name",
        accessor: "itemName",
        Cell: ({ row, value }) => {
          return (
            <>
              <div className="font-weight-bold">{value}</div>
              <div className="d-flex">
                <Badge variant="light">{row.original.store.name}</Badge>
              </div>
            </>
          );
        },
      },
      {
        Header: "Available In",
        accessor: "itemCapacity",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.itemCapacity} {row.original.storageUnit}
            </>
          );
        },
      },
      {
        Header: "Available Quantity",
        accessor: "totalQuantity",
        Cell: ({ value }) => {
          return value;
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
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }) => {
          return actionColumnFormatter(row);
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
      <BTablePagination
        columns={columns}
        dataUrl={`/items/low?${authStoresEquals()}`}
        pagination
      />
      
    
  );
}

export function actionColumnFormatter({row}) {
  return (
    <>
      <Button variant="info" size="sm" as={Link} to={`/items/${row.original.id}/order`}>
        Reorder
      </Button>
    </>
  );
}
