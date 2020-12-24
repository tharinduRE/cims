import React, { useState } from "react";
import { Badge, Button, Card, Col, Collapse, Row, Table } from "react-bootstrap";
import {
  BsArchiveFill,
  BsChevronDoubleDown,
  BsPencilSquare,
  BsReplyAllFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatDate } from "../_helpers/DateFormatHelper";

export default function ResultCard({ item, showModel }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="my-2">
        <Card.Body className="p-lg-2">
          <Row>
            <Col xl={2}>
              <span className="badge bg-secondary text-dark my-2 mx-2">{item.store.name.toUpperCase()}</span>
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
                onClick={() => showModel(item.id)}
                variant="success"
                size="sm"
                className="mr-2"
              >
                <BsReplyAllFill /> Issue
              </Button>
             
              <Button variant="outline-warning" size="sm" className="mr-2">
                <BsArchiveFill />
              </Button>
              <Button variant="outline-info" size="sm" onClick={() => setOpen(!open)}>
                <BsChevronDoubleDown /> View
              </Button>
            </Col>
          </Row>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <div className="separator separator-dashed mb-5 mt-5"></div>
              <Table borderless>
                <thead>
                  <tr>
                    <th>StockBook Folio : </th>
                    <th>Unit Price</th>
                    <th>Item Status : </th>
                    <th>Min. Quantity : </th>
                    <th>Manufacturer : </th>
                    <th>Last Updated : </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Badge variant="info">{item.stockBookFolio}</Badge>
                    </td>
                    <td>
                      <label>Rs. {item.unitPrice.toFixed(2)}</label>
                    </td>
                    <td>{item.itemStatus === null ? "N/A" : item.itemStatus}</td>
                    <td>{item.minimumQuantity === null ? "N/A" : item.minimumQuantity}</td>
                    <td>{item.itemManufacturer === null ? "N/A" : item.itemManufacturer}</td>
                    <td>
                      {item.lastUpdated === null
                        ? "N/A"
                        : formatDate(item.lastUpdated)}
                    </td>
                    <td>
                      <Link className="btn btn-outline-primary btn-sm" to={`/item/edit/${item.id}`}>
                        <BsPencilSquare /> Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </>
  );
}
