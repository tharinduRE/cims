import React from "react";
import { Formik } from "formik";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

export default function UserSettings() {
  return (
    <Card>
      <Card.Header className="py-3">
        <h3 className="font-weight-bolder mb-0"> Settings</h3>
        <span className="text-muted font-weight-bold font-size-sm mt-1">System Settings</span>
      </Card.Header>
      <Card.Body>
        <Formik>
          {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Auto Login
                </Form.Label>
                <Col sm={6}>
                  <Form.Check type="switch" id="custom-switch" label="Check this switch" />
                </Col>
              </Form.Group>
              <div className="separator separator-dashed mb-10"></div>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" variant="info" disabled={isSubmitting}>
                    Save
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
