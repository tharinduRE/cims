import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Row, Spinner } from "react-bootstrap";
import itemService from "../item/ItemCrud";
import orderService from "./OrderCrud";
import { BsApp } from "react-icons/bs";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../pages/auth/AuthProvider";

export default function ItemOrder({ itemId, onCancel }) {
  const { state: authState } = React.useContext(AuthContext);
  const user = authState.user;

  const [itemStock, setitemStock] = useState([]);

  const getItem = async (id) => {
    const res = await itemService.get(id);
    if (res) setitemStock(res.data);
  };

  const sendOrderRequest = async (values) => {
    const payload = {
      ...values,
      itemStockId: itemStock.id,
      orderStatus: "PENDING",
      requestedById: user.id,
    };
    const res = await orderService.create(payload);
    if(res.status ===201){
       onCancel();
    }
  };

  const schema = Yup.object().shape({
    quantity: Yup.number().required("quantity"),
  });

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  return (
    <Card className="">
      <Card.Header className="border-0 pb-10 ">
        <div className="d-flex align-items-center">
          <div className={`symbol symbol-50 symbol-light-danger mr-5`}>
            <span className="symbol-label font-size-h3">
              <BsApp />
            </span>
          </div>
          <div className="d-flex flex-column">
            <h3 className="card-label font-size-h3 font-weight-bolder text-dark">Reorder</h3>
            <span className="text-muted font-weight-bolder font-size-lg">
              Reorder item low on inventory
            </span>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="pt-0">
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
                {itemStock.itemName || <Skeleton />}
              </span>
              <span className="text-muted font-weight-bold font-size-lg">
                Available{" "}
                {itemStock.totalQuantity !== 0
                  ? itemStock.totalQuantity
                  : "N/A" || <Skeleton width={30} />}
              </span>
            </div>
          </div>
        </div>
        <Formik
          validationSchema={schema}
          initialValues={{
            quantity: 1,
          }}
          enableReinitialize={true}
          onSubmit={async (values) => {
            await sendOrderRequest(values);
          }}
        >
          {({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
            <Form onSubmit={handleSubmit}>
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

              <Button
                variant="dark"
                type="submit"
                disabled={isSubmitting}
                block
              >
                Order
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
  );
}
