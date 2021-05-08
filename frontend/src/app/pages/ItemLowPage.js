import React from "react";
import { Col, Row } from "react-bootstrap";
import { DisplayCard } from "../components";
import ItemLowTable from "../views/item/ItemLowTable";

export default function ItemLowPage() {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={10}>
          <DisplayCard title="Low Inventory" subtitle="Items reached minimum quantity">
            <ItemLowTable />
          </DisplayCard>
        </Col>
      </Row>
    </>
  );
}
