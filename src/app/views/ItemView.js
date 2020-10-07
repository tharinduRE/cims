import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import itemService from "../service/itemService";

export default function ItemView(props) {
  let { id } = useParams();

  const item = {
    id: null,
    totalQuantity: 1,
    minimumQuantity: 62756,
    itemStatus: "OUTOFSTOCK",
    stockStore: "Q_FIT_GLASS",
    sdsfile: "interfaces Missouri Chief",
    itemTransactions: [],
    invStorageId: 1,
    storageUnitId: 1,
    item: {
      id: 2,
      itemName: "Alizarine Red / Na Alizarine Sulphonate",
      itemDesc: null,
      casNumber: null,
      stockBookFolio: "1.02",
      itemCapacity: null,
      unitPrice: null,
      hazardCodes: [
        { id: 1, hazardCode: 73470, hazardCodeDesc: "models virtual" },
        { id: 2, hazardCode: 14730, hazardCodeDesc: "Baby Investor" },
      ],
    },
  };

  const [itemStock, setitemStock] = useState(item);

  const getItemStock = (id) => {
    itemService
      .get(id)
      .then((response) => {
        setitemStock(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemStock(id);
  }, [id]);

  return (
    <>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Header><h1>
            {itemStock.item.itemName} 
              </h1></Card.Header>
            <Card.Body>
              {itemStock.id}
              {itemStock.itemStatus}
              {itemStock.minimumQuantity}
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
