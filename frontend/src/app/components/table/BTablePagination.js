import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import fetchApi from "../../service/Axios";
import DataTable from "./DataTable";

export default function BTablePagination({ columns, dataUrl, countUrl, pagination, reInitialize }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, seterror] = useState("");

  /*  const [count, setCount] = useState(0)
  const [totalPages, settotalPages] = useState(0)

  const getCount = async(pageSize)=> {
    const res = await fetchApi.get(`${countUrl}`);
    setCount(res.data);
    settotalPages(Math.ceil(count / pageSize));
  } */

  const getDataUrl = (page, sizePerPage) => {
    if (pagination) return `${dataUrl}&size=${sizePerPage}&page=${page}`;
    return dataUrl;
  };

  const getData = async (page, sizePerPage) => {
    setLoading(true);
    try {
      const res = await fetchApi.get(getDataUrl(page, sizePerPage));
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      seterror(error);
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = ({ pageSize, pageIndex }) => {
    getData(pageIndex, pageSize);
  };

  const pageSize = 5
  const pageIndex = 0

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUrl, countUrl, pageIndex, pageSize, reInitialize]);

  if (error) return <Alert variant="danger">failed to load</Alert>;
  if (loading) return <SpinnerLoader />;
  if (data.length === 0) return <Alert variant="info">No Data available</Alert>;
  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={pagination}
    />
  );
}

export function SpinnerLoader() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner as="span" animation="border" role="status" aria-hidden="true" />
    </div>
  );
}
