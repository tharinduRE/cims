import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import WasteItems from '../views/WasteItems'
import WasteVendor from '../views/WasteVendor'

export default function WasteStore() {
    return (
        <Row>
            <Col lg={8}>
            <Card>
                <Card.Body>
                    <Card.Title><h2 className="font-weight-bolder">Waste Store</h2>
                <span className="text-muted">Manage Waste chemicals in one place</span></Card.Title>
                <WasteItems/>
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title><h2 className="font-weight-bolder">Registered Vendors</h2>
                <span className="text-muted">List of registered vendors to receive waste chemicals</span></Card.Title>
                <WasteVendor/>
                </Card.Body>
            </Card>
            </Col>
            <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title><h3 className="font-weight-bolder">Vendors</h3>
                <span className="text-muted">Manage vendors who recieve waste products</span></Card.Title>
                <Button variant="outline-dark">Add new Vendor</Button>
                </Card.Body>
            </Card>

            </Col>
        </Row>
    )
}
