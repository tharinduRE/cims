import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import fetchApi from "../../service/Axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";

export default function RegisterUser() {
  const [stores, setStores] = useState([]);

  const history = useHistory();

  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const getStores = async () => {
    const response = await fetchApi.get(`/stores`);
    setStores(response.data);
  };

  const registerUser = async (payload) => {
    const res = await fetchApi.post(`/users`, payload);
    if (res.status === 201) {
      notify(`New account Created for ${payload.firstName} ${payload.lastName}`);
      history.push("/user/manage");
    }
    if (res.status === 400) notifyError(res.title);
  };

  const handleUserForm = async(values) => {
    await registerUser(values);
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    postTitle: Yup.string().required("Position is required"),
    email: Yup.string().email().required(),
    password: Yup.string().min(6),
    authStores: Yup.array().min(1),
    passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    getStores();
  }, []);
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h3 className="font-weight-bolder">Add a New User</h3>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                initialValues={{
                  email: "user@system.com",
                  password: "admin123",
                  firstName: "John",
                  lastName: "Adam",
                  postTitle: "",
                  avatarUrl: "default",
                  authorities: ["ROLE_USER"],
                  passwordConfirmation: "admin123",
                  authStores: [],
                }}
                onSubmit={async(values) => {
                  console.log(values);
                  await handleUserForm(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setSubmitting,
                  isSubmitting,
                  isValid,
                  values,
                  touched,
                  errors,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        First Name
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          name="firstName"
                          type="text"
                          placeholder="FirstName"
                          className="form-control-solid"
                          value={values.firstName}
                          onChange={handleChange}
                          isInvalid={errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Last Name
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          className="form-control-solid"
                          value={values.lastName}
                          onChange={handleChange}
                          isInvalid={errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Position
                      </Form.Label>
                      <Col sm={8}>
                        <Typeahead
                          id="post-title"
                          name="postTitle"
                          newSelectionPrefix="Add a new position: "
                          placeholder="Select users' position"
                          clearButton
                          options={[
                            "Lecturer",
                            "Lab Staff",
                            "Temporary Demonstrator",
                            "Lab Assistant",
                            "Adminstrator",
                          ]}
                          onChange={(s) => {
                            setFieldValue("postTitle", s[0]);
                            handleChange("postTitle");
                          }}
                          isInvalid={errors.postTitle ? true : false}
                          custom
                        ></Typeahead>
                        <Form.Control.Feedback type="invalid">
                          {errors.postTitle}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <div className="separator separator-dashed mb-5"></div>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Autherized Stores
                      </Form.Label>
                      <Col sm={8}>
                        <Typeahead
                          id="auth-stores"
                          labelKey="name"
                          multiple
                          onChange={(s) => {
                            setFieldValue("authStores", s);
                            handleChange("authStores");
                          }}
                          options={stores}
                          placeholder="Choose autherized stores..."
                          isInvalid={errors.authStores ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.authStores}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}></Form.Label>
                      <Col sm={8}>
                        <Form.Check
                          name="isAdmin"
                          type="checkbox"
                          id="is-admin"
                          onChange={(s) => {
                            s.target.checked
                              ? setFieldValue("authorities", ["ROLE_ADMIN", "ROLE_USER"])
                              : setFieldValue("authorities", ["ROLE_USER"]);
                            handleChange("authorities");
                          }}
                          label={<span className="text-danger">is New User a Admin</span>}
                        />
                        <Form.Text className="text-muted">
                          Check this only if you want new user to be an Administrator
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <div className="separator separator-dashed mb-5"></div>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Email
                      </Form.Label>
                      <Col sm={8}>
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
                      <Form.Label column sm={4}>
                        Password
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Change Password"
                          className="form-control-solid mb-4"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={errors.password}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>

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
                        <Button type="submit" variant="info" disabled={isSubmitting}>
                          Register{" "}
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
