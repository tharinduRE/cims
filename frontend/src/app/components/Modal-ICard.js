import React from "react";
import { Card, Modal } from "react-bootstrap";
import { BsApp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

export default function ModalICard({ icon, title, subtitle, variant,iconField,nameField,nameSubField,children}) {
  const Icon = (Icon) => {
    return <Icon />;
  };
  const [show, setShow] = React.useState(true);

  const history = useHistory();

  const handleClose = () => {
    setShow(false)
    history.goBack();
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Card className="">
      <Modal.Header className="border-0 pb-10 ">
        <div className="d-flex align-items-center">
        <div className={`symbol symbol-50 symbol-${variant || `light-info`} mr-5`}>
            <span className="symbol-label font-size-h3">
            {Icon(icon || BsApp)}
            </span>
          </div>
          <div className="d-flex flex-column">
            <h3 className="card-label font-size-h3 font-weight-bolder text-dark">{title}</h3>
            <span className="text-muted font-weight-bolder font-size-lg">
            {subtitle}
            </span>
          </div>
        </div>
      </Modal.Header>

      <Card.Body className="pt-0">
        <div className="p-5 mt-n5 bg-white mb-10 shadow-sm rounded">
          <div className="d-flex">
            <div className="symbol symbol-60 symbol-circle symbol-light-success mr-5">
              <span className="symbol-label font-size-h4">
                {iconField}
              </span>
            </div>
            <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
              <span className="text-dark font-weight-bolder text-hover-primary font-size-h3">
                {nameField || <Skeleton />}
              </span>
              <span className="text-muted font-weight-bold font-size-lg">
              { nameSubField || <Skeleton width={30} />}
              </span>
            </div>
          </div>
        </div>

        <div>
          {children}
        </div>
        </Card.Body></Card>
    </Modal>
      
  );
}
