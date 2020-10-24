import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const { dispatch } = React.useContext(AuthContext);

  const payload = {
    user: {
      id: 1,
      authStores: ["ORG", "INORG"],
      authRoles: ["ROLE_ADMIN", "ROLE_USER"],
      firstName: "Tharindu",
      lastName: "Premasiri",
      postTitle: "Admin",
      email: "admin@system.com",
      department: "Department of Chemistry",
    },
    token: 12314,
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("required"),
  });

  const handleLogin = (values) => {  
      console.log(values);
    dispatch({ type: "LOGIN", payload: payload });
  };

  return (
    <>
      <div className="mb-20">
        <h3>Sign In To Admin</h3>
        <div className="text-muted font-weight-bold">
          Enter your details to login to your account:
        </div>
      </div>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: "admin@system.com", password: "12345" }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                className="form-control h-auto form-control-solid py-4 px-8"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                className="form-control h-auto form-control-solid py-4 px-8"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="info" className="font-weight-bold px-9 py-4 my-3 mx-4">
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <div className="mt-10">
        <span className="opacity-70 mr-4">Trouble Login !!! </span>
        <Link to="/auth/login-help" className="text-muted text-hover-primary font-weight-bold">
          Help!
        </Link>
      </div>
    </>
  );
}
