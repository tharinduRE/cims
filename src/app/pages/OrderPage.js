import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import OrderHistory from "../views/OrderHistory";

export default function OrderPage() {
  return (
    <Row className="justify-content-center">
      <Col lg={10}>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2 className="font-weight-bolder">
                <Badge variant="warning" className="font-size-h5">
                  Pending
                </Badge>{" "}
                Orders
              </h2>
              <span className="text-muted">Items ordered to fill in</span>
            </Card.Title>
            <OrderHistory status="PENDING" />
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>
              <h2 className="font-weight-bolder">Past Orders</h2>
              <span className="text-muted">
                List of past{" "}
                <Badge variant="success" className="font-size-h5">
                  completed
                </Badge>
                orders{" "}
              </span>
            </Card.Title>
            <OrderHistory status="COMPLETED" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
