import React from "react";
import { Badge } from "react-bootstrap";
import { AuthContext } from "../../pages/auth/AuthProvider";
import { formatDate, timeAgo } from "../../_helpers/DateFormatHelper";
import BTablePagination from "../../components/table/BTablePagination";

export default function TxsTable({ pageSize ,noPagination,txType }) {
  const { state: authState } = React.useContext(AuthContext);
  const stores = authState.user.authStores;

  const searchable = () => {
    let searchStores = stores.map((store) => store.code);
    if (searchStores.length > 0 && searchStores.length != null) {
      return `&store.in=${searchStores.join(`&store.in=`)}`;
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell : ({row}) => {return (row.index +1 ) }
      },
      {
        
        Header: "Item Name",
        accessor: "itemStockName",
        Cell: ({ row, value }) => {
          return (
            <>
              {value}
              <div className="d-flex">
                <Badge variant="light">{row.itemStockStore}</Badge>
                <Badge>
                  {row.original.itemCapacity} {row.original.storageUnit}
                </Badge>
              </div>
            </>
          );
        },
      },
      {
        Header: "Issued By",
        accessor: "issuerName",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ value }) => { return (Math.abs(value))}
      },
      {
        Header: "Date Issued",
        accessor: "transactionDate",
        Cell: ({ value }) => {
          return (
            <>
              <span>{formatDate(value)}</span>
              <span className="d-flex text-muted">{timeAgo(value)}</span>
            </>
          );
        },
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <BTablePagination
      columns={columns}
      dataUrl={`/transactions?sort=id,desc&sort=transactionDate,desc&transactionType.equals=${txType}${searchable()}`}
      countUrl={`/transactions/count`}
    />
  );
}
