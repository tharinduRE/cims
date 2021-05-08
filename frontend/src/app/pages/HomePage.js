import React from "react";
import { Col, Row } from "react-bootstrap";
import StatCard from "../components/StatCard";
import { DisplayCard, EngageCard } from "../components/";
import FeedbackCard from "../components/FeedbackCard";
import ItemLowTable from "../views/item/ItemLowTable";
import TxsTable from "../views/txs/TxsTable";

export default function HomePage() {
  return (
    <>
      <Row>
        <Col>
        <StatCard/>
        </Col>
      </Row>
      <Row>
        <Col lg='8'>
          <DisplayCard
            title="Last Issued Items"
            subtitle="list of last issued items "
            moreLink="/issues"
          >
            <TxsTable txType="ISSUE" />
          </DisplayCard>
          <DisplayCard
            title="Low Stock Items"
            subtitle="Items reached minimum quantity"
            moreLink="/items/low"
          >
            <ItemLowTable />
          </DisplayCard>
        </Col>
        <Col>
          <EngageCard
            title="Welcome to chemical inventory and management system"
            btnText="Add new item"
            btnLink="/items/add"
          />
          <FeedbackCard/>
        </Col>
      </Row>
    </>
  );
}
