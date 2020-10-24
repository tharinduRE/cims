import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import itemService from "../../service/itemService";
import utilSerivice from "../../service/utilService";
import { AuthContext } from "../../pages/auth/AuthProvider";
import { getStoreName } from "../../_helpers/StoreNameHelper";
import { useHistory, useParams } from "react-router-dom";
import {BsChevronLeft} from 'react-icons/bs';

export default function ItemDetail(props) {
  const { state: authState } = React.useContext(AuthContext);
  let { id } = useParams();

  const history = useHistory();

  const stores = authState.user.authStores;
  const [measUnit, setmeasUnit] = useState([]);

  const notify = () => toast.success("Updated!");

  const intialItem = {
    itemCapacity: 200,
    itemName: "",
    unitPrice: 1,
    invStorageId: 1,
    itemStatus: "NEW",
    stockStore: "ORG",
    storageUnitId: 1,
    totalQuantity: 1,
  };

  const [itemStock, setitemStock] = useState(intialItem);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setitemStock({ ...itemStock, [e.target.name]: e.target.value });
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

  const getMeasUnit = () => {
    utilSerivice
      .getMeasUnits()
      .then((response) => {
        setmeasUnit(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItemStock = (id) => {
    const payload = {
      ...itemStock,
      id: id,
    };

    itemService
      .update(payload)
      .then((response) => {
        setSubmitted(true);
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setitemStock({ ...intialItem });
  };

  useEffect(() => {
    if (id) {
      getItem(id);
    }
    if (submitted) {
      notify();
    }
    getMeasUnit();
  }, [id, submitted]);

  return (
    <>
      <Button variant="outline-dark" onClick={() => history.goBack()}>
        <BsChevronLeft/> Back
      </Button>

      <Row className="justify-content-center">
        <Col lg={6}>
          {submitted ? (
            <Card>
              <Alert variant="success">
                Submiited.
                <Button variant="link" onClick={() => setSubmitted(false)}>
                  Add another item
                </Button>
              </Alert>
              <Card.Body>
                <Row>
                  <Col>
                    Item : {itemStock.itemName}
                    Quantity : {itemStock.totalQuantity}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header className="border-0">
                <Card.Title>
                  <h3 className="card-label font-size-h3 font-weight-bolder text-dark">
                    Edit item
                  </h3>
                </Card.Title>
              </Card.Header>
              <Card.Body className="pt-0">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateItemStock(id);
                  }}
                >
                  <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      required
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
                  <Form.Group className="my-5">
                    <Form.Label>Item Store</Form.Label>
                    <Form.Control
                      as="select"
                      name="stockStore"
                      onChange={handleInputChange}
                      value={itemStock.stockStore}
                    >
                      {stores.map((store, idx) => (
                        <option key={idx}>{getStoreName(store)}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Item Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          name="totalQuantity"
                          placeholder="Item Quantity"
                          onChange={handleInputChange}
                          value={itemStock.totalQuantity}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-8">
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
                      <Form.Group className="mb-8">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control
                          as="select"
                          name="storageUnit"
                          onChange={() => handleInputChange}
                          value={itemStock.storageUnitId}
                        >
                          {measUnit.map((measUnit, index) => (
                            <option key={index}>{measUnit.measUnit}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-8">
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

                  <Button variant="info" type="submit">
                    Update
                  </Button>
                  <Button variant="clear"> Cancel </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
}
