import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ItemUpdate from '../views/ItemUpdate'

export default function ImportPage() {
  return (
    <Row>
      <Col lg={4}>
          <ItemUpdate />
      </Col>
    </Row>
  )
}
