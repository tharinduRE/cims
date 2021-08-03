import React from 'react'
import { Button } from "react-bootstrap";
import BTablePagination from "../../components/table/BTablePagination";
import { formatDate, timeAgo } from "../../_helpers/DateFormatHelper";

export default function ReportsTable() {
    const columns = [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Issued by",
          accessor: "createdBy",
        },
        {
          Header: "Date Generated",
          accessor: "createdOn",
          Cell: ({ value }) => {
            return (
              <>
                <span>{formatDate(value)}</span>
                <span className="d-flex text-muted">{timeAgo(value)}</span>
              </>
            );
          },
        },
        {
          Header: "Download",
          accessor: "reportUrl",
          Cell: ({ value, row }) => {
            return (
              <Button
                as="a"
                href= {value}
                target="_blank"
                download={row.name}
                size="sm"
                variant="outline-dark"
              >
                Download
              </Button>
            );
          },
        },
      ];
    
      return (
        <BTablePagination columns={columns} dataUrl={`/reports?size=5&sort=createdOn%2Cdesc`} />
      );
}
