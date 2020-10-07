import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ItemUpdate from '../views/ItemUpdate'

export default function ImportPage() {
  return (
    <Row>
      <Col lg={4}>
        <Card>
          <Card.Header>Add New Item</Card.Header>
          <Card.Body>

          <ItemUpdate />

          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
