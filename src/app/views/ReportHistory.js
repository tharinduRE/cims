import React, { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import moment from "moment";
import axios from "../service/Axios";

function base64ToBlob(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: "application/pdf" });
}

export default function ReportHistory({reload}) {
  const [reportList, setreportList] = useState([]);

  const getReports = async () => {
    await axios
      .get(`/inv-reports?size=3&sort=createdOn%2Cdesc`)
      .then((response) => {
        setreportList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(reload){
      getReports();
 
    }
    getReports();
  }, [reload]);

  return (
    <>
      {reportList && reportList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Issued by</th>
              <th>Date Generated</th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report, index) => (
              <tr key={index}>
                <td>
                  <small>{index + 1}</small>
                </td>
                <td>{report.name}</td>
                <td>{report.createdBy}</td>

                <td>
                  <span>{moment(report.createdOn).format("MMM Do YY, h:mm a")}</span>
                  <span className="d-flex text-muted">{moment(report.createdOn).fromNow()}</span>
                </td>
                <td>
                  {report.report ? (
                    <Button
                      as="a"
                      href={window.URL.createObjectURL(base64ToBlob(report.report))}
                      download={report.name}
                      size="sm"
                      variant="outline-dark"
                    >
                      Download
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert className="alert alert-warning">No Reports found</Alert>
      )}
    </>
  );
}
