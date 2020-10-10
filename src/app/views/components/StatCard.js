import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import itemService from "../../service/itemService";

export default function StatCard(props) {
  const [itemCount, setItemCount] = useState([0]);

  const getItemCounts = () => {
    itemService
      .count("INORG")
      .then((response) => {
        setItemCount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemCounts();
  }, []);

  return (
    <>
      <Card className="card-custom my-5">
        <Card.Header>
          <h3 className="text-muted">Inventory Stats</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Organic</Card.Title>
              <Card.Title>
                <h1 className="text-info">{itemCount}</h1>
              </Card.Title>
            </Col>
            <Col>
              <Card.Title>InOrganic</Card.Title>
              <Card.Title>
                <h1 className="text-danger">{itemCount}</h1>
              </Card.Title>
            </Col>
            <Col>
              <Card.Title>Acids</Card.Title>
              <Card.Title>
                <h1 className="text-primary">{itemCount}</h1>
              </Card.Title>
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <Card.Title>GlassWare</Card.Title>
              <Card.Title>
                <h1 className="text-success">{itemCount}</h1>
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
