import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import transactionService from "../service/transactionService";

export default function ItemTransaction() {
  const [itemList, setItemList] = useState([]);

  const getItemList = (count) => {
    transactionService
      .getAllIssues(count)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemList(5);
  }, []);

  return (
    <>
      {itemList && itemList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Store</th>
              <th>Quantity</th>
              <th>Date Issued</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {transaction.itemStockId}
                </td>
                <td>
                <span className="badge bg-dark">
                  ORGANIC 
                  </span>
                </td>
                <td>
                  {transaction.quantity}
                </td>
                <td> {transaction.transactionDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert className="alert alert-warning">No Item Stocks found</Alert>
      )}
    </>
  );
}
