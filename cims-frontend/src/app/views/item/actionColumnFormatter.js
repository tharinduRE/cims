import React from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { Spacer } from "../../components";

export default function actionColumnFormatter({
  row,
  openDeleteDiolog,
  openEditDiolog,
  openIssueDiolog,
}) {
  
  return (
    <>
      <Dropdown className="d-inline">
        <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => openEditDiolog(row.original.id)}>Edit</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => openDeleteDiolog(row.original.id)}>
            <span className="text-danger">Delete</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Spacer x={1}/>
      <Dropdown as={ButtonGroup}>
        <Button variant="dark" size="sm" onClick={() => openIssueDiolog(row.original.id)}>
          Issue
        </Button>
        <Dropdown.Toggle size="sm" split variant="dark" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item>View Issue History</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Spacer x={1}/>
      <Button size="sm" variant="warning">
        Discard
      </Button>
    </>
  );
}
