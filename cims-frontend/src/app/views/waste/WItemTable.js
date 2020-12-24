import React, {  } from "react";
import {format} from "date-fns";
import BTablePagination from "../../components/table/BTablePagination";

export default function WItemTable() {
  
  const columns = [
    {
      Header: "Item",
      accessor: "itemName",
    },
    {
      Header: "Item Capacity",
      accessor: "itemCapacity",
    },
    {
      Header: "Quantity",
      accessor: "itemQuantity",
    },
    {
      Header: "Last Updated",
      accessor: "createdOn",
      Cell:({value})=>{
        return(<span>{format(new Date(value), 'do MMM yy, hh:mm aaaa')}</span>)
      }
    },
  ]
  return (<BTablePagination columns={columns} dataUrl={`/waste-items`} />)
    
}
