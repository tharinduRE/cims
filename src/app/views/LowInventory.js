import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import itemService from "../service/itemService";

export default function LowInventory() {
  const stores = ["ORG", "INORG", "ACIDS", "NORM_GLASS", "Q_FIT_GLASS"];

  const [itemList, setItemList] = useState([]);
  const [store, setStore] = useState([stores[1]]);

  const getItemList = (store) => {
    itemService
      .getLowAll(store, 1)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropdown = (eventKey, evt) => {
    setStore(stores[eventKey]);
  };

  useEffect(() => {
    getItemList(store);
  }, [store]);

  return (
    <>
      <div className="d-md-flex">
        <DropdownButton
          title="Store"
          id="dropdown-menu-align-right"
          size="sm"
          drop="right"
          variant="secondary"
          onSelect={handleDropdown}
        >
          {stores.map((store, index) => (
            <Dropdown.Item key={index} eventKey={index}>
              {store}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {itemList && itemList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Available In</th>
              <th>Total Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((itemStock, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-weight-bold">{itemStock.itemName}</div>
                  <div className="d-flex">
                    <span className="text-muted font-weight-bold">
                      CAS : {itemStock.casNumber}
                    </span>
                    <span className="badge bg-primary">
                      {itemStock.stockStore}
                    </span>
                  </div>
                </td>
                <td>
                  {itemStock.itemCapacity} {itemStock.storageUnitId}
                </td>
                <td>{itemStock.totalQuantity}</td>
                <td>{itemStock.unitPrice}</td>
                <td>
                  <Button className="btn-sm btn-info font-weight-bolder">
                    {" "}
                    Reorder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert className="alert alert-warning">No Item Stocks found</Alert>
      )}
    </>
  );
}
