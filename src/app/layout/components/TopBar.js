import React from "react";
import { Dropdown } from "react-bootstrap";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-item mr-3">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Logout
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
