import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import itemService from "../service/itemService";
import HazardLabel from "../views/components/HazardLabel";
import ItemIssue from "../views/ItemIssue";
import ItemUpdate from "../views/ItemUpdate";

export default function Browse() {
  const stores = ["ORG", "INORG", "ACIDS", "NORM_GLASS",];
  const [itemList, setItemList] = useState([]);
  const [store, setStore] = useState("ORG");
  const [showModel, setShowModel] = useState({
    show: false,
    id: 1,
    type: "alert",
  });

  const handleIssueModel = (type, id) => {
    setShowModel({ show: true, id: id, type: type });
  };

  const getItemList = (store) => {
    itemService
      .getAll(store)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    itemService
      .deleteOne(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemList(store);
  }, [store]);

  return (
    <Row>
      <Col lg={2}>
          <Row>
            { stores.map((stores,index) => (
              <Col className="my-2" key={index}>
              <Button  variant="light" className="d-block px-5 py-2" as="a" onClick={()=> setStore(stores)}>
                <span className="d-block text-dark-75 font-weight-bold mt-2"><h5>{stores}</h5></span>
                <span className="d-block text-muted font-weight-bold">Store</span>
              </Button>
            </Col>
            ))}
            
          </Row>
      </Col>
      <Col lg={10}>
        {itemList && itemList.length > 0 ? (
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Store</th>
                    <th>Total Quantity</th>
                    <th>Unit Price</th>
                    <th>Hazard Codes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((itemStock, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {itemStock.itemName}
                        <span className="text-muted font-weight-bold d-block">
                          CAS : {itemStock.casNumber}
                        </span>
                      </td>
                      <td>
                        <span className="badge d-block bg-primary">{itemStock.stockStore}</span>
                      </td>
                      <td>
                        {itemStock.totalQuantity}
                        <span className="text-muted font-weight-bold d-block">
                          available in : {itemStock.itemCapacity} {itemStock.storageUnitId}
                        </span>
                      </td>
                      <td>{itemStock.unitPrice}</td>
                      <td>
                        {itemStock.hazardCodes} <HazardLabel labels={[1, 2]} />
                      </td>
                      <td>
                        <Dropdown className="d-inline">
                          <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleIssueModel("edit", itemStock.id)}>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => handleIssueModel("alert", itemStock.id)}>
                              <span className="text-danger">Delete</span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={ButtonGroup}>
                          <Button
                            variant="dark"
                            size="sm"
                            onClick={() => handleIssueModel("issue", itemStock.id)}
                          >
                            Issue
                          </Button>
                          <Dropdown.Toggle
                            size="sm"
                            split
                            variant="dark"
                            id="dropdown-split-basic"
                          />

                          <Dropdown.Menu>
                            <Dropdown.Item>View Issue History</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <Button size="sm" variant="warning">
                          Discard
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <Alert className="alert alert-warning">No Item Stocks found</Alert>
        )}

        <Modal
          show={showModel.show}
          onHide={() => setShowModel({ show: false, id: 0 })}
          dialogClassName="modal-90w"
          animation={false}
          aria-labelledby="add-item-dialog"
        >
          <Modal.Body className="p-0">
            {
              {
                alert: (
                  <Card>
                    <Card.Body>
                      <Alert>Confirm Delete the item </Alert>
                      <Button variant="danger" onClick={() => deleteItem(showModel.id)}>
                        Confirm
                      </Button>
                      <Button variant="light" onClick={() => setShowModel({ show: false })}>
                        Cancel
                      </Button>
                    </Card.Body>
                  </Card>
                ),
                edit: <ItemUpdate update />,
                issue: <ItemIssue itemId={showModel.id} />,
              }[showModel.type]
            }
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
