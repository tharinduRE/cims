import React from "react";
import BTablePagination from "../../components/table/BTablePagination";
import { formatDate } from "../../_helpers/DateFormatHelper";

export default function WVendorTable() {

  const columns = [
    {
      Header: "Vendor Name",
      accessor: "itemName",
    },
    {
      Header: "Vendor Address",
      accessor: "vendorAddress",
    },
    {
      Header: "Contact",
      accessor: "vendorContact",
    },
    {
      Header: "Last Issued",
      accessor: "lastIssuedOn",
      Cell:({value})=>{
        return(<span>{formatDate(new Date(value), 'do MMM yy, hh:mm aaaa')}</span>)
      }
    },
  ]

  return <BTablePagination dataUrl="/waste-vendors" columns={columns} />
}
