import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, Row, Spinner } from "react-bootstrap";
import itemService from "../item/ItemCrud";
import orderService from "./OrderCrud";
import * as Yup from "yup";
import { AuthContext } from "../../pages/auth/AuthProvider";
import { useHistory, useParams } from "react-router-dom";
import ModalICard from "../../components/Modal-ICard";

export default function OrderForm() {
  const { state: authState } = React.useContext(AuthContext);
  const user = authState.user;

  const [item, setItem] = useState([]);

  const { id } = useParams();
  const itemId = id;
  const getItem = async (id) => {
    const res = await itemService.get(id);
    if (res) setItem(res.data);
  };

  const history = useHistory();

  const cancel = () => {
    history.goBack();
  };

  const sendOrderRequest = async (values) => {
    const payload = {
      ...values,
      itemStockId: item.id,
      orderStatus: "PENDING",
      requestedById: user.id,
    };
    const res = await orderService.create(payload);
    if (res.status === 201) {
      cancel();
    }
  };

  const schema = Yup.object().shape({
    quantity: Yup.number().required("quantity"),
  });

  useEffect(() => {
    getItem(itemId);
  }, [itemId]);

  return (
    <ModalICard
      title="Order Item"
      nameField={item.itemName}
      nameSubField={`In : ${item.itemCapacity}${item.storageUnit}`}
    >
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

            <Button variant="dark" type="submit" disabled={isSubmitting} block>
              Order
              {isSubmitting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                ""
              )}
            </Button>
            <Button variant="clear" onClick={() => cancel()} block>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </ModalICard>
  );
}
