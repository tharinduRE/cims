import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { BsBoxArrowRight, BsExclamationCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LoginHelp() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <h2 className="text-weight-bold">
            <BsExclamationCircle size="2rem" /> Login Help
          </h2>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Alert variant="info">
          If this is the first time you login obtain login credentials from adminstrator
        </Alert>
        <Button variant="warning">Reset password</Button>
        <Link to="/auth/login" className="btn btn-info">
          {" "}
          <BsBoxArrowRight /> Login
        </Link>
      </Card.Body>
      <Card.Footer>
        <Alert variant="light">
          <Button variant="light" size="sm">
            Contact
          </Button>{" "}
          developer for more support
        </Alert>
      </Card.Footer>
    </Card>
  );
}
