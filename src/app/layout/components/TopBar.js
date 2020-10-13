import React from "react";
import { Dropdown } from "react-bootstrap";

export default function TopBar() {

  const handleSelect = (e) => {
    console.log(e);
  }
  
  return (
    <div className="topbar">
      <div className="topbar-item mr-3">
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Logout
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={1}>Settings</Dropdown.Item>            
            <Dropdown.Item eventKey={2}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
