import React from "react";
import {Col, Row } from "react-bootstrap";
import {DisplayCard} from "../components"
import TxsTable from "../views/txs/TxsTable";

export default function IssuePage() {
  return (
    <Row className="justify-content-center">
      <Col lg={10}>
        <DisplayCard title="Last Issued History" subtitle="Comprhensive list of Issued items">
          <TxsTable txType="ISSUE" />
        </DisplayCard>
      </Col>
    </Row>
  );
}
