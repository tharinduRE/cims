import React from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import FormFileInput from "react-bootstrap/esm/FormFileInput";
import { BsPen } from "react-icons/bs";
import { AuthContext } from "../auth/AuthProvider";
import { getStoreName } from "../../_helpers/StoreNameHelper";
import { Formik } from "formik";
import * as Yup from "yup";

export default function UserProfile() {
  const { state: AuthState } = React.useContext(AuthContext);

  const authUser = AuthState.user;

  const handleUserForm = (values) => {
    console.log(values);
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    postTitle: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h3 className="font-weight-bolder"> Edit User</h3>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                initialValues={Object.assign({}, authUser, {
                  password: "",
                  passwordConfirmation: "",
                })}
                onSubmit={(values) => {
                  handleUserForm(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleReset,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Avatar
                      </Form.Label>
                      <Col sm={6}>
                        <div className="image-input-wrapper">
                          <Image
                            src={process.env.PUBLIC_URL + "/images/avatar.svg"}
                            rounded
                            fluid
                          />
                          <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow">
                            <BsPen />
                            <FormFileInput
                              className="d-none"
                              id="image-input"
                              accept=".png, .jpg, .jpeg"
                            />
                          </label>
                        </div>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        First Name
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          name="firstName"
                          type="text"
                          placeholder="FirstName"
                          className="form-control-solid"
                          value={values.firstName}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Last Name
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          className="form-control-solid"
                          value={values.lastName}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Position
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          name="postTitle"
                          as="select"
                          size="sm"
                          onChange={handleChange}
                          custom
                        >
                          <option>Lecturer</option>
                          <option>Lab Staff</option>
                          <option>Temporary Demonstrator</option>
                          <option>Lab Assistant</option>
                          <option>Adminstrator</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <div className="separator separator-dashed mb-5"></div>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Autherized Stores
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control as="select" htmlSize={3} readOnly custom>
                          {values.authStores.map((store, index) => (
                            <option key={index}>{getStoreName(store)}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <div className="separator separator-dashed mb-5"></div>
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Email
                      </Form.Label>
                      <Col sm={6}>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="form-control-solid"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Password
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Change Password"
                          className="form-control-solid"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={errors.password}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Col>
                      <Col sm={4}>
                        <Form.Control
                          name="passwordConfirmation"
                          type="password"
                          placeholder="Confirm New Password"
                          className="form-control-solid"
                          value={values.passwordConfirmation}
                          onChange={handleChange}
                          isInvalid={errors.passwordConfirmation}
                          isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.passwordConfirmation}
                        </Form.Control.Feedback>

                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" variant="info">
                          Update
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
