import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, InputGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import itemService from "../service/itemService";
import utilSerivice from "../service/utilService";
import { AuthContext } from "../pages/auth/AuthProvider";
import { getStoreName } from "../_helpers/StoreNameHelper";
import { Formik } from "formik";
import * as Yup from "yup";

export default function ItemUpdate({ id, update, onComplete, popUp }) {
  const { state: authState } = React.useContext(AuthContext);

  const stores = authState.user.authStores;
  const [measUnit, setmeasUnit] = useState([]);

  const notify = () => toast.success("Updated!");

  const [itemStock, setitemStock] = useState({
    itemCapacity: 1,
    itemName: "",
    unitPrice: 1,
    itemStatus: "NEW",
    totalQuantity: 1,
    stockStore: "ORG",
    storageUnitId: 1,
  });
  const [submitted, setSubmitted] = useState(false);

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

  const saveItemStock = (values) => {
    const payload = {
      ...values,
      invStorageId: 1,
    };

    itemService
      .add(payload)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateItemStock = (values) => {
    const payload = {
      ...values,
      id: id,
    };

    itemService
      .update(payload)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getItem(id);
    }
    if (submitted) {
      notify();
    }
    getMeasUnit();
  }, [id, submitted, onComplete]);

  const schema = Yup.object().shape({
    itemName: Yup.string().required("Valid Name is required"),
    unitPrice: Yup.number().required("Price must entered"),
    stockStore: Yup.string().required(),
    totalQuantity: Yup.number().required(""),
  });

  return (
    <>
      <Card>
        <Card.Header className="border-0">
          <Card.Title>
            <h3 className="card-label font-size-h3 font-weight-bolder text-dark">
              Add New Product
            </h3>
            <span className="text-muted mt-5 font-weight-bolder font-size-lg">
              Add new item to inventory
            </span>
          </Card.Title>
        </Card.Header>
        <Card.Body className="pt-0">
          <Formik
            validationSchema={schema}
            initialValues={itemStock}
            enableReinitialize={true}
            onSubmit={(values) => {
              update ? updateItemStock(values) : saveItemStock(values);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleReset,
              isSubmitting,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    onChange={handleChange}
                    value={values.itemName}
                    isInvalid={errors.itemName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.itemName}</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Enter full item name as appeared in container
                  </Form.Text>
                </Form.Group>
                <Form.Group className="my-5">
                  <Form.Label>Item Store</Form.Label>
                  <Form.Control
                    as="select"
                    name="stockStore"
                    onChange={handleChange}
                    value={values.stockStore}
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
                        onChange={handleChange}
                        value={values.totalQuantity}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-8">
                      <Form.Label>Item Capacity</Form.Label>

                      <Form.Control
                        type="number"
                        name="itemCapacity"
                        onChange={handleChange}
                        value={values.itemCapacity}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-8">
                      <Form.Label>Unit</Form.Label>
                      <Form.Control
                        as="select"
                        name="storageUnit"
                        onChange={() => handleChange}
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
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name="unitPrice"
                      placeholder="Unit Price"
                      onChange={handleChange}
                      value={values.unitPrice}
                      isInvalid={errors.unitPrice}
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">{errors.unitPrice}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="info" type="submit">
                  {update ? "Update" : "Save"}
                  {isSubmitting && !submitted ? (
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
                <Button variant="outline-info" onClick={handleReset}>
                  Reset
                </Button>
                <Button variant="clear" onClick={onComplete}>
                  {" "}
                  Cancel{" "}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}
