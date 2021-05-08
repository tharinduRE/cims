import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { BsEyeFill, BsReplyAllFill } from "react-icons/bs";
import { ModalLink } from "./common/ModalLink";

export default function ResultCard({ item }) {
  return (
    <>
      <Card className="my-2">
        <Card.Body className="p-lg-2">
          <Row>
            <Col xl={2}>
              <span className="badge bg-secondary text-dark my-2 mx-2">
                {item.store.name.toUpperCase()}
              </span>
            </Col>
            <Col xl={4} className="py-2">
              <Badge className="text-monospace">{item.itemName}</Badge>
            </Col>
            <Col xl={3}>
              Available{" "}
              <Badge variant="dark" className="font-weight-bolder font-size-h6">
                {item.totalQuantity}
              </Badge>{" "}
              in{" "}
              <span className="badge bg-light my-2 mx-2 text-dark">
                {item.itemCapacity} {item.storageUnit}
              </span>
            </Col>
            <Col xl={3}>
              <Button
                as={ModalLink}
                path={`/items/${item.id}/issue/`}
                variant="success"
                size="sm"
                className="mr-2"
              >
                <BsReplyAllFill /> Issue
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                as={ModalLink}
                path={`/items/view/${item.id}`}
              ><BsEyeFill/> View
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
