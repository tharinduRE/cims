import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

export default function UserSettings() {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h3 className="font-weight-bolder"> Settings</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Auto Login
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Check type="switch" id="custom-switch" label="Check this switch" />
                  </Col>
                </Form.Group>
                <div className="separator separator-dashed mb-10"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
