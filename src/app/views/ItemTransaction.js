import React, { useEffect, useState } from "react";
import { Alert, Badge, Table } from "react-bootstrap";
import transactionService from "../service/transactionService";
import moment from "moment";

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
        getItemList(10);
    }, []);

    return (
        <>
            {itemList && itemList.length > 0 ? (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Issued by</th>
                            <th>Quantity</th>
                            <th>Date Issued</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList.map((transaction, index) => (
                            <tr key={index}>
                                <td>
                                    <small>{index + 1}</small>
                                </td>
                                <td>
                                    {transaction.itemStockName}
                                    <div className="d-flex">
                                        <Badge variant="light">{transaction.itemStockStore}</Badge>
                                        <Badge>{transaction.itemCapacity} {transaction.storageUnit}</Badge>
                                    </div>
                                </td>
                                <td>
                                  {transaction.issuerName}
                                </td>

                                <td>{Math.abs(transaction.quantity)}</td>
                                <td>
                                    <span>
                                        {moment(transaction.transactionDate).format(
                                            "MMM Do YY, h:mm a"
                                        )}
                                    </span>
                                    <span className="d-flex text-muted">
                                        {moment(transaction.transactionDate).fromNow()}
                                    </span>
                                </td>
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
