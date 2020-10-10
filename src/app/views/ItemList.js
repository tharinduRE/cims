import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Table, } from "react-bootstrap";
import itemService from "../service/itemService";
import HazardLabel from "./components/HazardLabel";

export default function ItemList() {
  const [itemList, setItemList] = useState([]);

  const getItemList = (store) => {
    itemService
      .getAll(store)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemList("ORG");
  }, []);

  return (
    <Row>
      <Col lg="8">
        { itemList && itemList.length > 0 ? (
          <Card>
          <Card.Header>Item List</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Store</th>
                  <th>Total Quantity</th>
                  <th>Unit Price</th>
                  <th>Hazard Codes</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((itemStock, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      {itemStock.itemName}
                      <span className="text-muted font-weight-bold d-block">
                        CAS : {itemStock.casNumber}
                      </span>
                    </td>
                    <td>
                      <span className="badge d-block bg-primary">
                        {itemStock.stockStore}
                      </span>
                    </td>
                    <td>
                      {itemStock.totalQuantity}
                      <span className="text-muted font-weight-bold d-block">
                        available in : {itemStock.itemCapacity}{" "}
                        {itemStock.storageUnitId}
                      </span>
                    </td>
                    <td>{itemStock.unitPrice}</td>
                    <td>
                      {itemStock.hazardCodes}{" "}
                      <HazardLabel labels={[1, 2]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        ) :(
            <Alert className="alert alert-warning">No Item Stocks found</Alert>
        )} 
        
      </Col>
      <Col lg="4">
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
