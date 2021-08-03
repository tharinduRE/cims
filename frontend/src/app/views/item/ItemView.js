import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import ModalCard from "../../components/ModalCard";
import itemService from "./ItemCrud";
import Skeleton from "react-loading-skeleton";
import { Spacer } from "../../components/Spacer.js";
import { ModalLink } from "../../components/common/ModalLink";

export default function ItemView() {
  const [item, setItem] = React.useState(null);

  const getItem = (id) => {
    itemService
      .get(id)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let { id } = useParams();
  let history = useHistory();

  React.useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id]);

  return (
    <ModalCard title={item == null ? <Skeleton width={30} /> : item.itemName}>
      <Row>
        <Col>
          <span className="badge bg-secondary text-dark my-2 mx-2">
            {" "}
            {item == null ? <Skeleton width={30} /> : item.store.name}
          </span>
          <span className="badge bg-light my-2 mx-2 text-dark">
            {item == null ? <Skeleton width={30} /> : item.casNumber}
          </span>
        </Col>
        <Col></Col>
        <Col>
          Stock Book Folio :{" "}
          <span className="badge bg-info text-light my-2">
            {item == null ? <Skeleton width={30} /> : item.stockBookFolio}
          </span>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col className="text-center">
          Item Capacity
          <span className="badge bg-light my-2 mx-2 text-dark">
            {item == null ? <Skeleton width={30} /> : `${item.itemCapacity} ${item.storageUnit}`}
          </span>
        </Col>
        <Col className="text-center">
          Available Quantity :{" "}
          <span>{item == null ? <Skeleton width={30} /> : item.totalQuantity}</span>
        </Col>
        <Col>
          {" "}
          Unit Price :
          <span className="badge bg-light my-2 mx-2 text-dark">
            {" "}
            {item == null ? <Skeleton width={30} /> : `"Rs. ${item.unitPrice.toFixed(2)}`}
          </span>
        </Col>
      </Row>
      <Row className="mt-10">
        {/* <Button variant="outline-info" as={ModalLink} path={`/items/edit/${item == null ? 0 :item.id}`} block>
          {" "}
          Update
        </Button>
        <Button variant="outline-dark" as={ModalLink} path={`/items/${item == null ? 0 : item.id}/issue/`} block>
          {" "}
          Issue
        </Button> */}
        <Button variant="light" onClick={() => history.goBack()} block>
          {" "}
          Close
        </Button>
      </Row>
    </ModalCard>
  );
}
