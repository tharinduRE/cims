import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserTable from "./user/UserTable";

export default function ManageUsers() {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="card-custom">
            <Card.Header className="border-0 pt-3">
              <Card.Title className="flex-column align-items-start">
                <h2 className="font-weight-bolder">Manage Users</h2>
                <span className="text-muted">Manage All users in the system</span>
              </Card.Title>
              <div className="card-toolbar">
                <Button as={Link} to="/user/register" variant="info">
                  Add New User
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <UserTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
