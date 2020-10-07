import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import itemService from "../service/itemService";

export default function ItemUpdate(props) {
  const stores = ["ORG", "INORG", "ACIDS", "NORM_GLASS"];

  const intialItem = {
    itemCapacity: 200,
    itemName: "Test-item",
    unitPrice: 200.9,
    invStorageId: 1,
    itemStatus: "NEW",
    stockStore: "ORG",
    storageUnit: "ml",
    totalQuantity: 1,
  };

  const [itemStock, setitemStock] = useState(intialItem);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setitemStock({ ...itemStock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItemStock();
  };

  const saveItemStock = () => {
    const payload = {
      ...itemStock,
      item: {
        itemName: itemStock.itemName,
        unitPrice: itemStock.unitPrice,
      },
      invStorageId: 1,
      storageUnitId: 1,
    };

    itemService
      .add(payload)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
        resetForm()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
      setitemStock({...intialItem});
  }
  

  return (
      <>

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          name="itemName"
          placeholder="Item Name"
          onChange={handleInputChange}
          value={itemStock.itemName}
        />
        <Form.Text className="text-muted">
          Enter full item name as appeared in container
        </Form.Text>
      </Form.Group>
      <Row className="my-5">
        <ButtonToolbar onChange={handleInputChange}>
          <ToggleButtonGroup
            type="radio"
            name="stockStore"
            value={itemStock.stockStore}
          >
            {stores.map((store, index) => (
              <ToggleButton key={index} value={store}>
                {store}
              </ToggleButton>
            ))}
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
              value={itemStock.totalQuantity}
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
              value={itemStock.itemCapacity}
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
              name="storageUnit"
              onChange={handleInputChange}
              value={itemStock.storageUnitId}
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
          name="unitPrice"
          placeholder="Unit Price"
          onChange={handleInputChange}
          value={itemStock.unitPrice}
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
      
      </>

  );
}
