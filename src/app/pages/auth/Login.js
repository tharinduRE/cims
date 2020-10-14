import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function Login() {
    const { dispatch } = React.useContext(AuthContext);

    const payload = {
        user: {
            userName: "Tharindu P.",
            postTitle: "Admin",
            department: "Department of Chemistry",
        },
        token: 12314,
    };

    const handleLogin = (e) => {
        e.preventDefault();
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
            <Form onSubmit={(e) => handleLogin(e)}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        className="form-control h-auto form-control-solid py-4 px-8"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="form-control h-auto form-control-solid py-4 px-8"
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="info"
                    className="font-weight-bold px-9 py-4 my-3 mx-4"
                >
                    Login
                </Button>
            </Form>

            <div className="mt-10">
                <span className="opacity-70 mr-4">Trouble Login !!! </span>
                <Link
                    to="/auth/login-help"
                    className="text-muted text-hover-primary font-weight-bold"
                >
                    Help!
                </Link>
            </div>
        </>
    );
}
