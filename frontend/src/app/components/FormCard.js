import React from "react";
import { Card, Modal } from "react-bootstrap";
import { BsApp } from "react-icons/bs";

export default function MadalCard({ icon, title, subtitle, children,variant }) {
  const Icon = (Icon) => {
    return <Icon/>
  }

  return (
      <Card>
        <Modal.Header className="border-0 pb-0">
          <div className="d-flex align-items-center">
            <div className={`symbol symbol-50 symbol-${variant || `light-info`} mr-5`}>
              <span className="symbol-label font-size-h3">{Icon(icon || BsApp)}</span>
            </div>
            <div className="d-flex flex-column">
              <h3 className="card-label font-size-h3 font-weight-bolder text-dark">{title}</h3>
              <span className="text-muted font-weight-bolder font-size-lg">{subtitle}</span>
            </div>
          </div>
        </Modal.Header>
        
        <Card.Body>{children}</Card.Body>
      </Card>      
  );
}
