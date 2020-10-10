import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, FormControl } from "react-bootstrap";
import itemService from "../service/itemService";
import transactionService from "../service/transactionService";

export default function ItemIssue({ itemId }) {
  const [itemStock, setitemStock] = useState([]);
  const [quantity, setquantity] = useState(0);

  const issue = {
    itemStockId: itemId,
    quantity: 0,
    transactionType: "ISSUE",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendIssueRequest(quantity);
  };

  const getItem = (id) => {
    itemService
      .get(id)
      .then((response) => {
        setitemStock(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendIssueRequest = (q) => {
    const payload = {
      ...issue,
      quantity: q,
    };
    transactionService
      .postTransaction(payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  return (
    <>
      <Card>
        <Card.Header className="border-0">
          <Card.Title>
            <h3 className="card-label font-size-h3 font-weight-bolder text-dark">
              Issue a item
            </h3>
            <span className="text-muted mt-5 font-weight-bolder font-size-lg">
              Issue item from inventory
            </span>
          </Card.Title>
        </Card.Header>
        <Card.Body className="pt-0">
          <Form onSubmit={handleSubmit}>
            <Row className="my-5">
              <Col>
                <h2>
                  Item : <span>{itemStock.itemName}</span>
                </h2>
              </Col>
            </Row>
            <Row className="mb-8">
              <Col>
                <h5>
                  Available Quantity :
                  <span className="text-muted">{itemStock.totalQuantity} </span>{" "}
                </h5>
              </Col>
              <Col>
                <span className="badge badge-light text dark">
                  {itemStock.itemCapacity}
                </span>
              </Col>
            </Row>
            <Row className="mb-8">
              <Col></Col>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity : </Form.Label>
                  <FormControl
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                  ></FormControl>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="dark" type="submit">
              Issue
            </Button>
            <Button variant="clear"> Cancel </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
