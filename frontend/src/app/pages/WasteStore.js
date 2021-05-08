import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {DisplayCard} from '../components/'
import VendorCard from '../views/waste/VendorCard';
import WItemTable from '../views/waste/WItemTable';
import WVendorTable from '../views/waste/WVendorTable';

export default function WasteStore() {
    return (
      <Row>
        <Col lg={8}>
          <DisplayCard title="Waste Chemicals" subtitle="Manage Waste chemicals in one place">
            <WItemTable/>
          </DisplayCard>
          <DisplayCard
            title="Registered Vendors"
            subtitle="List of registered vendors to receive waste chemicals"
          ><WVendorTable/>
          </DisplayCard>
        </Col>
        <Col lg={4}>
          <VendorCard/>
        </Col>
      </Row>
    );
}
