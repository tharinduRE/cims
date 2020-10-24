import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, FormControl } from "react-bootstrap";
import itemService from "../service/itemService";
import transactionService from "../service/transactionService";
import { AuthContext } from "../pages/auth/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";

export default function ItemIssue({ itemId, onComplete,onCancel }) {
  const [itemStock, setitemStock] = useState([]);

  const { state: authState } = React.useContext(AuthContext);

  const issue = {
    itemStockId: itemId,
    createdById: authState.user.id,
    quantity: 0,
    transactionType: "ISSUE",
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
      quantity: -Math.abs(q),
    };
    transactionService
      .postTransaction(payload)
      .then((response) => {
        console.log(response.data);
        onComplete(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  const schema = Yup.object().shape({
    quantity: Yup.number()
      .required("quantity")
      .max(itemStock.totalQuantity, "Quantity must be less than or equal to total"),
  });

  return (
    <>
      <Card>
        <Card.Header className="border-0">
          <Card.Title>
            <h3 className="card-label font-size-h3 font-weight-bolder text-dark">Issue a item</h3>
            <span className="text-muted mt-5 font-weight-bolder font-size-lg">
              Issue item from inventory
            </span>
          </Card.Title>
        </Card.Header>
        <Card.Body className="pt-0">
          <Formik
            validationSchema={schema}
            initialValues={{
              quantity: 1,
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              sendIssueRequest(values.quantity);
            }}
          >
            {({ handleSubmit, handleChange, handleReset, values, errors }) => (
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
                    <span className="badge badge-light text dark">{itemStock.itemCapacity}</span>
                  </Col>
                </Row>
                <Row className="mb-8">
                  <Col></Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Quantity : </Form.Label>
                      <FormControl
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        isInvalid={errors.quantity}
                      ></FormControl>
                      <FormControl.Feedback type="invalid">{errors.quantity}</FormControl.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="dark" type="submit">
                  Issue
                </Button>
                <Button variant="clear" onClick={onCancel}>Cancel</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}
