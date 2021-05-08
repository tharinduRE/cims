import React from "react";
import { Col, Row } from "react-bootstrap";
import {DisplayCard} from "../components";
import Orders from "../views/order/OrdersTable";

export default function OrderPage() {
  return (
    <Row className="justify-content-center">
      <Col lg={10}>
        <DisplayCard title="Pending Orders"><Orders status="PENDING"/></DisplayCard>
        <DisplayCard title="Past Orders"><Orders status="COMPLETED"/></DisplayCard>
      </Col>
    </Row>
  );
}
