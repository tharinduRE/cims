import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Col,
  Row,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import itemService from "../service/itemService";

export default function AddNewItem() {
  const item = {
    item: {
      itemCapacity: 1,
      itemDesc: "",
      itemName: "Test-item",
      stockBookFolio: "12-09",
      unitPrice: 0,
    },
    invStorageId: 1,
    itemStatus: "NEW",
    stockStore: "ORG",
    storageUnitId: 1,
    totalQuantity: 1,
  };

  const [values, setValues] = useState(item);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItemStock()
  };

  const saveItemStock = () => {
    const itemStock = {

    };

    itemService
      .add(itemStock)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <Card className="card card-custom">
          <Card.Header>
            <Card.Title className="card-label">Add new item</Card.Title>
          </Card.Header>

          <Card.Body>Add new item to inventory</Card.Body>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card>
          <Card.Header>
            <Card.Title>Enter Item Information</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Item Name"
                  onChange={handleInputChange}
                  value={values.item.itemName}
                />
                <Form.Text className="text-muted">
                  Enter full item name as appeared in container
                </Form.Text>
              </Form.Group>
              <Row className="my-5">
                <ButtonToolbar>
                  <ToggleButtonGroup
                    type="radio"
                    name="stockStore"
                    onChange={handleInputChange}
                    value={values.stockStore}
                  >
                    {["ORG", "INORG", "ACIDS", "GLASSWARE"].map(
                      (store, index) => (
                        <ToggleButton key={index} value={store}>
                          {store}
                        </ToggleButton>
                      )
                    )}
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Item Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="totalQuantity"
                      placeholder="Item Quantity"
                      onChange={handleInputChange}
                      value={values.totalQuantity}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Item Capacity</Form.Label>
                    <Form.Control
                      as="select"
                      name="itemCapacity"
                      onChange={handleInputChange}
                      value={values.item.itemCapacity}
                    >
                      {[1, 200, 500, 250].map((cap, idx) => (
                        <option key={idx}>{cap}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                      as="select"
                      name="storageUnitId"
                      onChange={handleInputChange}
                      value={values.storageUnitId}
                    >
                      {["kg", "ml", "l", "g", "unit"].map((measUnit, index) => (
                        <option key={index}>{measUnit}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unit Price"
                  onChange={handleInputChange}
                  value={values.item.unitPrice}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="card-footer">
                <Button variant="info" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
