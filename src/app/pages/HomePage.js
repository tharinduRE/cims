import React from "react";
import { Alert, Card } from "react-bootstrap";

export default function HomePage() {
  return (
    <div className="row">
      <div className="col-lg-12">
      <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>
      </div>
      
      <div className="col-lg-6">
        <Card className="bg-secondary">
          <Card.Header>
            <Card.Title>Welcome</Card.Title>
          </Card.Header>
          <Card.Body>
            Welcome to chemical inventory and management system
          </Card.Body>
        </Card>
      </div>
      <div className="col-lg-6">
        <Card className="bg-primary">
          <Card.Header>
            <Card.Title>Help</Card.Title>
          </Card.Header>
          <Card.Body>
            Welcome to chemical inventory and management system
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
