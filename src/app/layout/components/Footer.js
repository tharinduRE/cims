import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Footer() {
  const today = new Date().getFullYear();

  const [showModel, setShowModel] = useState(false);

  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);

  return (
    <>
      {/* begin::Footer */}
      <Modal 
        show={showModel}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="footer footer-fixed bg-white py-4 d-flex flex-lg-column">
        {/* begin::Container */}
        <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
          {/* begin::Copyright */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-">
              {today} &copy;
            </span>
            {` `}
            <a
              href="https://github.com/tharinduRE/cims-web-app"
              rel="noopener noreferrer"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              Tharindu Premasiri
            </a>
          </div>
          {/* end::Copyright */}
          {` `}
          {/* begin::Nav */}
          <div className="nav nav-dark order-1 order-md-2">
            <a href="void:" onClick={handleShow} className="nav-link pr-3 pl-0">About</a>
          </div>
          {/* end::Nav */}
        </div>
        {/* end::Container */}
      </div>
      {/* end::Footer */}
    </>
  );
}
