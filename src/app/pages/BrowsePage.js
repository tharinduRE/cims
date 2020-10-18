import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  Modal,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import itemService from "../service/itemService";
import HazardLabel from "../views/components/HazardLabel";
import ItemIssue from "../views/ItemIssue";
import ItemUpdate from "../views/ItemUpdate";
import { AuthContext } from "./auth/AuthProvider";
import {getStoreName} from '../_helpers/StoreNameHelper'

export default function Browse() {

  const { state: authState } = React.useContext(AuthContext);

  const stores = authState.user.authStores;

  const [itemList, setItemList] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [store, setStore] = useState(stores[0]);
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
        setShowModel({ show: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = () => {
    setShowModel({ show: false });
    setUpdated(true);
  };

  useEffect(() => {
    if (updated) {
      getItemList(store);
    }
    getItemList(store);
  }, [store, updated]);

  return (
    <Row>
      <Col lg={12}>
        <Card className="card-custom">
          <Card.Header className="mx-3">
            <Nav variant="tabs" as="ul" className="nav-bold nav-tabs-line nav-tabs-line-3x">
              {stores.map((str, index) => (
                <Nav.Item key={index} as="li" className="mr-3">
                  <Nav.Link
                    onClick={() => setStore(str)}
                    className={str === store ? "active" : " "}
                  >
                    <span className="nav-text">{getStoreName(str)}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Header>

          <Card.Body>
            {itemList && itemList.length > 0 ? (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Store</th>
                    <th>Total Quantity</th>
                    <th>Unit Price</th>
                    <th>Hazard Category</th>
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
                        <span className="text-center">{itemStock.totalQuantity}</span>
                        <span className="text-muted font-weight-bold d-block">
                          Available in : {itemStock.itemCapacity} {itemStock.storageUnit}
                        </span>
                      </td>
                      <td>Rs. {itemStock.unitPrice.toFixed(2)}</td>
                      <td>
                        {itemStock.hazardCodes.map((hCode, idx) => (
                          <HazardLabel key={idx} labels={[hCode.hazardCode]} />
                        ))}
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
            ) : (
              <Alert className="alert alert-warning">No Item Stocks found</Alert>
            )}
          </Card.Body>
        </Card>

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
                edit: <ItemUpdate onComplete={() => onUpdate()} id={showModel.id} update popUp />,
                issue: <ItemIssue onComplete={() => onUpdate()} itemId={showModel.id} />,
              }[showModel.type]
            }
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
