import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import StatCard from "../components/StatCard";
import ItemUpdate from "../views/item/ItemUpdate";
import {DisplayCard,EngageCard} from "../components/";
import FeedbackCard from "../components/FeedbackCard";
import ItemLowTable from "../views/item/ItemLowTable";
import { Spacer } from "../components";
import { isAdmin } from "../_helpers";
import TxsTable from "../views/txs/TxsTable";

export default function HomePage() {
  const [showModel, setShowModel] = useState(false);

  const itemModelClose = () => {
    setShowModel(false);
  };

  const statCard = () => {
    if (isAdmin())
      return (
        <>
          <StatCard />
          <Spacer />
        </>
      );
  };

  return (
    <>
      <Row>
        <Col lg="8" className="pt-5">
          <DisplayCard
            title="Last Issued Items"
            subtitle="list of last issued items "
            moreLink="/issues"
          >
            <TxsTable txType="ISSUE" />
          </DisplayCard>

          <DisplayCard
            title="Low Inventory"
            subtitle="Items reached minimum quantity"
            moreLink="/items/low"
          >
            <ItemLowTable />
          </DisplayCard>
        </Col>

        <Col lg="4" className="pt-5">
          {statCard()}

          <EngageCard
            title="Welcome to chemical inventory and management system"
            desc=""
            btnText="Add new item"
            action={() => setShowModel(true)}
          />

          <Modal
            show={showModel}
            onHide={() => itemModelClose()}
            dialogClassName="modal-130w"
            animation={false}
            aria-labelledby="add-item-dialog"
          >
            <Modal.Body className="p-0">
              <ItemUpdate onComplete={() => itemModelClose()} onCancel={() => itemModelClose()} />
            </Modal.Body>
          </Modal>

          <FeedbackCard />
        </Col>
      </Row>
    </>
  );
}
