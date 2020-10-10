import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ItemIssue from '../views/ItemIssue'

export default function IssuePage() {
    return (
        <Row>
            <Col lg={4}>
                <ItemIssue itemId={2}/>
            </Col>
        </Row>
    )
}
