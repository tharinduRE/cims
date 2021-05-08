import React, { useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { AuthContext } from "./auth/AuthProvider";
import ItemsTable from "../views/item/ItemsTable";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

export default function Browse() {
  const { state: authState } = React.useContext(AuthContext);

  const stores = authState.user.authStores;

  const [currentStore, setStore] = useState(
    stores != null && stores.length > 0 ? stores[0].id : ""
  );

  return (
    <Row>
      <Col lg={12}>
        <Card className="card-custom">
          <Card.Header className="mx-3">
            <div className="card-toolbar">
                {stores.map((str, index) => (
                  <DropdownButton key={index} className="mr-3" variant="light-info" title={str.name}>
                    <Dropdown.Item
                      //as={Link} to={`/items/store/${str.id}`}
                      onClick={() => setStore(str.id)}
                      className={str.id === currentStore ? "active" : " "}
                    >
                      <span className="nav-text">{str.name}</span>
                    </Dropdown.Item>
                  </DropdownButton>
                ))}
            </div>
          </Card.Header>
          <Card.Body className="py-2">
            <ItemsTable store={currentStore} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
