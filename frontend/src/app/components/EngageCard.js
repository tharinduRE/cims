import React from "react";
import { Button, Card } from "react-bootstrap";
import { ModalLink } from "./common/ModalLink";

export function EngageCard({ title, desc, action, variant, btnText,btnLink }) {

  const button = () => {
    if (btnText)
      return (
        <Button variant={`${variant || `primary`}`} as={ModalLink} path={btnLink}>
          {btnText}
        </Button>
      );
  };
  return (
    <Card className={`bg-light-${variant || `primary`} shadow-sm mb-5`}>
      <Card.Body>
        <h5>{title}</h5>
        <p className="text-inverse-info pb-5 font-size-h6">{desc}</p>
        {button()}
      </Card.Body>
    </Card>
  );
}
