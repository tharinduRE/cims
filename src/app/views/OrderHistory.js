import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import axios from "../service/Axios";
import { formatDate } from "../_helpers/DateFormatHelper";

export default function OrderHistory({ status }) {
  const [orderList, setorderList] = useState([]);

  const getOrders = async () => {
    await axios
      .get(`/orders?orderStatus.equals=${status}&size=5&sort=requestDate`)
      .then((response) => {
        setorderList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {orderList && orderList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Requested By</th>
              <th>{{ PENDING: "Requested Date", COMPLETED: "Order Date" }[status]}</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={index}>
                <td>
                  <small>{index + 1}</small>
                </td>
                <td>
                  {order.itemName}
                  <span className="d-flex text-muted">
                    {order.itemCapacity}
                    {order.storageUnit}
                  </span>
                </td>
                <td>{order.quantity}</td>
                <td>{order.requestedBy}</td>
                <td>
                  <span>
                    {formatDate(
                      { PENDING: order.requestDate, COMPLETED: order.orderDate }[status]
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert className="alert alert-warning">No orders found</Alert>
      )}
    </>
  );
}
