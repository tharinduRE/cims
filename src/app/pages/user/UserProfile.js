import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import FormFileInput from "react-bootstrap/esm/FormFileInput";
import { BsPen } from "react-icons/bs";
import { AuthContext } from "../auth/AuthProvider";
import {getStoreName} from '../../_helpers/StoreNameHelper'

export default function UserProfile() {
  const { state: AuthState } = React.useContext(AuthContext);

  const authUser = AuthState.user;

  const [user, setUser] = useState(authUser);

  return (
    <>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h3 className="font-weight-bolder"> Edit User</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Avatar
                  </Form.Label>
                  <Col sm={6}>
                    <div className="image-input-wrapper">
                      <Image src={process.env.PUBLIC_URL + "/images/avatar.svg"} rounded fluid />
                      <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow">
                        <BsPen />
                        <FormFileInput
                          className="d-none"
                          id="image-input"
                          accept=".png, .jpg, .jpeg"
                        />
                      </label>
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    First Name
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      placeholder="FirstName"
                      className="form-control-solid"
                      value={user.firstName}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Last Name
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      className="form-control-solid"
                      value={user.lastName}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Position
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control as="select" size="sm" custom>
                      <option>Lecturer</option>
                      <option>Lab Staff</option>
                      <option>Temporary Demonstrator</option>
                      <option>Lab Assistant</option>
                      <option>Adminstrator</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <div className="separator separator-dashed mb-5"></div>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Autherized Stores
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control as="select" htmlSize={3} readOnly custom>
                      {user.authStores.map((store, index) => (
                        <option>{getStoreName(store)}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <div className="separator separator-dashed mb-5"></div>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="form-control-solid"
                      value={user.email}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form-control-solid"
                      value="12345678"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" variant="info">
                      Update
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
