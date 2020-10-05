import React from "react";
import { Card, Button } from "react-bootstrap";

export default function AboutPage() {
  return (
    <>
      <Card>
        <Card.Header>About</Card.Header>
        <Card.Body>
          <Card.Title>About this application</Card.Title>
          <Card.Text>
            This application is development as a project intiated by Mr. Prabath Gunatilake, as the indivdual project 
            completed for the fulfillment of degree.
          </Card.Text>
          <Button variant="primary" href="/">
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
