import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DisplayCard({ title, subtitle, children, moreLink }) {
  const viewAll = () => {
    if(moreLink)
    return (
      <Button as={Link} to={moreLink} className="btn-success font-weight-bold" size="sm">
        View All
      </Button>
    );
  };

  return (
    <Card className="mb-3 card-custom">
      <Card.Header className="border-0">
        <Card.Title>
          <h3 className="font-weight-bolder mb-0 text-uppercase">{title}</h3>
          <small className="text-muted ml-5">{subtitle}</small>
        </Card.Title>
        <div className="card-toolbar">{viewAll()}</div>
      </Card.Header>

      <Card.Body className="pt-2">{children}</Card.Body>
    </Card>
  );
}
