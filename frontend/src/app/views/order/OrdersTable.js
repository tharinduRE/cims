import React from "react";
import { Badge } from "react-bootstrap";
import BTablePagination from "../../components/table/BTablePagination";
import { formatDate } from "../../_helpers/DateFormatHelper";
import orderActions from "./orderActions";

export default function Orders({ status }) {
  const orderStatus = {
    header: () => {
      return { PENDING: `Request Date`, COMPLETED: `Order Date` }[status];
    },
    accessor: () => {
      return { PENDING: `requestDate`, COMPLETED: `orderDate` }[status];
    },
    dataUrl: () => {
      return {
        PENDING: `/orders?orderStatus.equals=${status}&sort=requestDate`,
        COMPLETED: `/orders?orderStatus.equals=${status}&sort=orderDate`,
      }[status];
    },
  };

  const columns = [
    {
      Header: "Item",
      accessor: "itemName",
    },
    {
      Header: "Item Capacity",
      accessor: "itemCapacity",
      Cell: ({value,row})=>{
      return <Badge variant="light">{`${value} ${row.original.storageUnit}`}</Badge>
      }
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Requested By",
      accessor: "requestedBy",
    },
    {
      Header: `${orderStatus.header()}`,
      accessor: `${orderStatus.accessor()}`,
      Cell: ({ value }) => {
        return <span>{formatDate(new Date(value), "do MMM yy, hh:mm aaaa")}</span>;
      },
    },
    {
      Header:"Actions",
      accessor:'id',
      Cell: ({value,row})=>{
        return orderActions({value,row});
      }

    }
  ];
  return <BTablePagination columns={columns} dataUrl={orderStatus.dataUrl()} />;
}
