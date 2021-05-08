import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, FormControl, Spinner } from "react-bootstrap";
import itemService from "./ItemCrud";
import { AuthContext } from "../../pages/auth/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "../../service/Axios";
import { useHistory, useParams } from "react-router-dom";
import ModelICard from "../../components/Modal-ICard";

export default function ItemIssue({ onComplete }) {
  const [itemStock, setitemStock] = useState([]);

  const { state: authState } = React.useContext(AuthContext);

  let { id } = useParams();

  const history = useHistory();

  const cancel = () => {
    history.goBack();
  };

  const issue = {
    itemStockId: id,
    createdById: authState.user.id,
    quantity: 0,
    transactionType: "ISSUE",
  };

  const getItem = async (id) => {
    const res = await itemService.get(id);
    if (res) setitemStock(res.data);
  };

  const sendIssueRequest = async(q) => {
    const payload = {
      ...issue,
      quantity: -Math.abs(q),
    };
    const res = await Axios.post("/transactions", payload)
    return res; 
  };

  useEffect(() => {
    getItem(id);
  }, [id]);

  const schema = Yup.object().shape({
    quantity: Yup.number()
      .required("quantity")
      .max(itemStock.totalQuantity, "Quantity must be less than or equal to total"),
  });

  return (
    <ModelICard
      title="Issue Item"
      iconField={`${itemStock.itemCapacity}${itemStock.storageUnit}`}
      nameField={itemStock.itemName}
      nameSubField={`${
        itemStock.totalQuantity !== 0 ? `Available : ${itemStock.totalQuantity}` : "Not Available"
      }`}
    >
      <Formik
        validationSchema={schema}
        initialValues={{
          quantity: 1,
        }}
        enableReinitialize={true}
        onSubmit={async(values) => {
          await sendIssueRequest(values.quantity);
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
              disabled={isSubmitting || itemStock.totalQuantity === 0}
              block
            >
              Issue
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
    </ModelICard>
  );
}
