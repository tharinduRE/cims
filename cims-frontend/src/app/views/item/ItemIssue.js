import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, FormControl, Spinner } from "react-bootstrap";
import itemService from "./ItemCrud";
import { AuthContext } from "../../pages/auth/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import { BsFillTerminalFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import Axios from "../../service/Axios";

export default function ItemIssue({ itemId, onComplete, onCancel }) {
  const [itemStock, setitemStock] = useState([]);

  const { state: authState } = React.useContext(AuthContext);

  const issue = {
    itemStockId: itemId,
    createdById: authState.user.id,
    quantity: 0,
    transactionType: "ISSUE",
  };

  const getItem = async (id) => {
    const res = await itemService.get(id);
    if(res) setitemStock(res.data);
  };

  const sendIssueRequest = (q) => {
    const payload = {
      ...issue,
      quantity: -Math.abs(q),
    };
    Axios.post('/transaction',payload)
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
      <Card className="bg-gray-100">
        <Card.Header className="border-0 pb-10 ">
          <div className="d-flex align-items-center">
            <div className={`symbol symbol-50 symbol-light-warning mr-5`}>
              <span className="symbol-label font-size-h3">
                <BsFillTerminalFill />{" "}
              </span>
            </div>
            <div className="d-flex flex-column">
              <h3 className="card-label font-size-h3 font-weight-bolder text-dark">Issue Item</h3>
              <span className="text-muted font-weight-bolder font-size-lg">
                Issue item from inventory
              </span>
            </div>
          </div>
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
            {({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="p-5 mt-n5 bg-white mb-10 shadow-sm rounded">
                  <div className="d-flex">
                    <div className="symbol symbol-60 symbol-circle symbol-light-success mr-5">
                      <span className="symbol-label font-size-h4">
                        {itemStock.itemCapacity}
                        {itemStock.storageUnit}
                      </span>
                    </div>
                    <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                      <span className="text-dark font-weight-bolder text-hover-primary font-size-h3">
                        {itemStock.itemName || <Skeleton/>}
                      </span>
                      <span className="text-muted font-weight-bold font-size-lg">
                        Available {itemStock.totalQuantity !== 0  ? itemStock.totalQuantity : "N/A" || <Skeleton width={30}/>}
                      </span>
                    </div>
                  </div>
                </div>

                <Form.Group as={Row}>
                  <Form.Label column sm={6} className="text-right">
                    Quantity
                  </Form.Label>
                  <Col sm={6}>
                    <FormControl
                      name="quantity"
                      type="number"
                      placeholder="Quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      min={0}
                      isInvalid={errors.quantity}
                    ></FormControl>
                    <FormControl.Feedback type="invalid">{errors.quantity}</FormControl.Feedback>
                  </Col>
                </Form.Group>

                <Button variant="dark" type="submit" disabled={isSubmitting || itemStock.totalQuantity === 0 } block>
                  Issue
                  {isSubmitting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    ""
                  )}
                </Button>
                <Button variant="clear" onClick={onCancel} block>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}
