import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import moment from "moment";
import axios from "../service/Axios";

export default function WasteItems() {
  const [itemList, setitemList] = useState([]);

  const getitems = async () => {
    await axios
      .get(`/waste-items`)
      .then((response) => {
        setitemList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getitems();
  }, []);

  return (
    <>
      {itemList && itemList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Item Capacity</th>
              <th>Quantity</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td>
                  <small>{index + 1}</small>
                </td>
                <td>
                  {item.itemName}
                  <span className="d-flex text-muted">{item.itemAddress}</span>
                </td>
                <td>{item.itemCapacity}</td>
                <td>{item.itemQuantity}</td>
                <td>
                  <span>{moment(item.lastUpdated).format("MMM Do YY, h:mm a")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert className="alert alert-warning">No items found</Alert>
      )}
    </>
  );
}
