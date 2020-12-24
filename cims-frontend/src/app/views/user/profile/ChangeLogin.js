import React from "react";
import { Card, Form, Col, Row, Button, Spinner, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import fetchApi from "../../../service/Axios";
import { Link } from "react-router-dom";

export default function ChangeLogin() {
  const handleUserForm = async (values) => {
    const payload = {
      currentPassword: values.password,
      newPassword: values.passwordConfirmation,
    };
    const res = await fetchApi.post(`/account/change-password`, payload);
    console.log(res.data);
  };

  const schema = Yup.object().shape({
    password: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be minimum 6 charaters")
      .required("Password cannot be empty"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Re-enter your new password"),
  });

  return (
    <Card>
      <Card.Header className="py-3">
        <h3 className="font-weight-bolder mb-0"> Login Information</h3>
        <span className="text-muted font-weight-bold font-size-sm mt-1">
          Change your login details
        </span>
      </Card.Header>
      <Card.Body>
        <Alert variant="dark">User Strong password to protect unautherized access</Alert>

        <div className="separator separator-dashed mb-5"></div>

        <Formik
          validationSchema={schema}
          initialValues={{ password: "", newPassword: "", passwordConfirmation: "" }}
          onSubmit={handleUserForm}
        >
          {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Current Password
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Current Password"
                    className="form-control-solid"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password}
                  />
                  <Link to="/reset-password" className="text-sm font-weight-bold mt-3">
                    Forgot password ?
                  </Link>
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  New Password
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    name="newPassword"
                    type="password"
                    placeholder="Enter New Password"
                    className="form-control-solid"
                    value={values.newPassword}
                    onChange={handleChange}
                    isInvalid={errors.newPassword}
                  />

                  <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
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
                  <Button type="submit" variant="info" disabled={isSubmitting}>
                    Change Password
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
  );
}
