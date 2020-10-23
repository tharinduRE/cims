import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import ItemIssue from "../views/ItemIssue";

export default function IssuePage() {
  const history = useHistory();
  const { id } = useParams();

  return (
    <>
      <Button variant="outline-dark" size="sm" onClick={() => history.goBack()}>
        <BsChevronLeft /> Back
      </Button>

      <Row className="mt-3">
        <Col lg={4}>
          <ItemIssue itemId={id} />
        </Col>
      </Row>
    </>
  );
}
