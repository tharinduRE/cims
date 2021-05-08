import React from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { ModalLink, Spacer } from "../../components";

export default function actionFormatter({
  row,
}) {
  
  return (
    <>
      <Dropdown className="d-inline">
        <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={ModalLink} path={`/items/edit/${row.original.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={ModalLink} path={`/items/delete/${row.original.id}`}>
            <span className="text-danger">Delete</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Spacer x={1} />
      <Dropdown as={ButtonGroup}>
        <Button variant="light-dark" size="sm" as={ModalLink} path={`/items/${row.original.id}/issue`}>
          Issue
        </Button>
        <Dropdown.Toggle size="sm" split variant="light-dark" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item>View Issue History</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Spacer x={1} />
      <Button size="sm" variant="light-primary" as={ModalLink} path={`/items/${row.original.id}/order`}>
        Order
      </Button>
    </>
  );
}
