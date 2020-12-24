import React, { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import fetchApi from "../../service/Axios";

export default function Login() {
  const { dispatch } = React.useContext(AuthContext);

  const AUTH_TOKEN_KEY = "authToken";

  const [login, setLogin] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("required"),
  });

  const getSession = async () => {
    const response = await fetchApi.get(`/account`);
    const user = response.data;
    dispatch({ type: "LOGIN", payload: { user: user } });
  };

  const handleLogin = async (values, rememberMe) => {
    try {
      const res = await fetchApi.post(`/authenticate`, values);
      if (res.status === 200) {
        const bearerToken = res.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (rememberMe) {
            localStorage.setItem(AUTH_TOKEN_KEY, jwt);
          } else {
            sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
          }
        }
        await getSession();
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error } });
    }
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
        enableReinitialize
        initialValues={login}
        onSubmit={(values) => handleLogin(values, false)}
      >
        {({ handleSubmit, handleChange, values, isSubmitting, touched, isValid, errors }) => (
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
              Login{" "}
              {isSubmitting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                ""
              )}
            </Button>
          </Form>
        )}
      </Formik>

      <Alert variant="light">
        Login as :
        <Button
          variant="light"
          size="sm"
          className="mr-3"
          onClick={() =>
            setLogin({
              email: "admin@system.com",
              password: "admin",
              rememberMe: false,
            })
          }
        >
          Admin
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() =>
            setLogin({
              email: "user@system.com",
              password: "user123",
              rememberMe: false,
            })
          }
        >
          User
        </Button>
      </Alert>

      <div className="mt-10">
        <span className="opacity-70 mr-4">Trouble Login !!! </span>
        <Link to="/auth/login-help" className="text-muted text-hover-primary font-weight-bold">
          Refer Help
        </Link>
      </div>
    </>
  );
}
