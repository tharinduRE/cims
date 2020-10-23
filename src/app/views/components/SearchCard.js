import React from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function SearchCard({ item }) {
    return (
        <>
            <Card className="my-2">
                <Card.Body className="ml-md-8 p-lg-2">
                    <Row>
                        <Col>
                            <span className="badge bg-secondary text-dark my-2 mx-2">
                                {item.stockStore}
                            </span>
                            <span className="badge bg-light my-2 mx-2 text-dark">
                                {item.casNumber}
                            </span>
                        </Col>
                        <Col className="text-center">
                            <span className="badge bg-light my-2 mx-2 text-dark">
                                {item.itemCapacity} {item.storageUnit}
                            </span>
                        </Col>
                        <Col>
                            Stock Book Folio :{" "}
                            <span className="badge bg-info text-dark my-2">
                                {item.stockBookFolio}
                            </span>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col>
                            <h3 className="font-weight-bold">{item.itemName}</h3>
                        </Col>
                        <Col className="text-center">
                            Available Quantity : <span>{item.totalQuantity}</span>
                        </Col>
                        <Col>
                            {" "}
                            Unit Price :
                            <span className="badge bg-light my-2 mx-2 text-dark">
                                {" "}
                                {"Rs. " + item.unitPrice.toFixed(2)}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
