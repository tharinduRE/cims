import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  Spinner,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import itemService from "./ItemCrud";
import utilSerivice from "../../service/utilService";
import { Formik } from "formik";
import * as Yup from "yup";
import { Typeahead } from "react-bootstrap-typeahead";
import { authStoreList } from "../../_helpers/AuthStoreHelper";
import { useHistory, useParams } from "react-router-dom";
import ModalCard from "../../components/ModalCard";

export default function ItemUpdate () {
  const authStores = authStoreList();
  const [measUnit, setmeasUnit] = useState([]);
  const [itemStock, setitemStock] = useState({
    itemCapacity: "",
    itemName: "",
    unitPrice: "",
    itemStatus: "NEW",
    totalQuantity: "",
    store: "",
    storageUnitId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  const cancel = (e) => {
    history.goBack();
  };

  let { id } = useParams();
  const update = id;
  
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

  const saveItemStock = async (values) => {
    const payload = {
      ...values,
      container: 1,
      store: {
        id: values.store,
      },
    };

    const res = await itemService.add(payload);
    console.log(res);
    if (res.status === 201) {
      setSubmitted(true);
      history.goBack();
    }
  };

  const updateItemStock = async (values) => {
    const payload = {
      ...values,
      id: id,
    };

    const res = await itemService.update(payload);
    if (res.status === 201) {
      setSubmitted(true);
      history.goBack();
    }
  };

  useEffect(() => {
    if (id) {
      getItem(id);
    }

    getMeasUnit();
  }, [id, submitted]);

  const schema = Yup.object().shape({
    itemName: Yup.string().required("Valid Name is required"),
    unitPrice: Yup.number().required("Price must entered"),
    store: Yup.number().required("Selecting Item Category is required"),
    itemCapacity: Yup.number().required(),
    totalQuantity: Yup.number().required(),
    storageUnitId: Yup.number().required(),
  });

  return (
    <ModalCard title="Add new item">
      <Formik
        validationSchema={schema}
        initialValues={itemStock}
        enableReinitialize={true}
        onSubmit={async (values) => {
          update ? await updateItemStock(values) : await saveItemStock(values);
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, isSubmitting, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="my-5">
              <Form.Label>Item Category</Form.Label>
              {authStores.length <= 2 ? (
                <ToggleButtonGroup
                  type="radio"
                  name="store"
                  bsPrefix={" "}
                  onChange={(value) => {
                    setFieldValue("store", value);
                    handleChange("store");
                  }}
                  className="mb-2 d-flex flex-row row m-0 btn-group-toggle"
                >
                  {authStores.map((store, idx) => (
                    <ToggleButton
                      key={idx}
                      variant="outline-primary"
                      value={store.id}
                      className="p-2 col mr-2"
                    >
                      <div className="ml-2 d-inline-block">
                        <span className="font-weight-bolder d-inline-block"> {store.name}</span>
                      </div>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              ) : (
                <Typeahead
                  id="item-store"
                  labelKey="name"
                  name="stockStore"
                  placeholder="Select item category"
                  clearButton
                  options={authStores}
                  onChange={(s) => {
                    setFieldValue("store", s);
                    handleChange("store");
                  }}
                  isInvalid={errors.store}
                />
              )}
            </Form.Group>
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

            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Item Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    name="totalQuantity"
                    placeholder="Item Quantity"
                    onChange={handleChange}
                    value={values.totalQuantity}
                    isInvalid={errors.totalQuantity}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-8">
                  <Form.Label>Item Capacity</Form.Label>

                  <Typeahead
                    id="itemCapacity"
                    type="number"
                    min={0}
                    allowNew
                    labelKey="label"
                    name="itemCapacity"
                    placeholder="Item Capacity"
                    newSelectionPrefix="Add : "
                    value={values.itemCapacity}
                    isInvalid={errors.itemCapacity}
                    options={[{ label: "200" }]}
                    onChange={(s) => {
                      handleChange("itemCapacity");
                      if (s.length > 0) setFieldValue("itemCapacity", s[0].label);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-8">
                  <Form.Label>Unit</Form.Label>
                  <Typeahead
                    id="meas-units"
                    labelKey="measUnit"
                    name="measUnit"
                    isInvalid={errors.storageUnitId}
                    defaultInputValue={values.storageUnitId}
                    placeholder="Select Unit"
                    options={measUnit}
                    onChange={(s) => {
                      setFieldValue("storageUnitId", s[0].id);
                      handleChange("storageUnitId");
                    }}
                  />
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
                  type="number"
                  name="unitPrice"
                  min={0}
                  placeholder="Unit Price"
                  onChange={handleChange}
                  value={values.unitPrice}
                  isInvalid={errors.unitPrice}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">{errors.unitPrice}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="info" type="submit" disabled={isSubmitting} block>
              {update ? "Update" : "Save"}
              {isSubmitting && !submitted ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                ""
              )}
            </Button>
            <Button variant="clear" onClick={()=>cancel()} block>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </ModalCard>
  );
}
