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
  const [store, setStore] = useState([stores[0]]);

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

  const handleDropdown = (eventKey,evt) => {
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
              <th>Store</th>
              <th>Total Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((itemStock, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {itemStock.item.itemName}
                  <span className="text-muted font-weight-bold d-block">
                    CAS : {itemStock.item.casNumber}
                  </span>
                </td>
                <td>
                  <span className="badge d-block bg-primary">
                    {itemStock.stockStore}
                  </span>
                </td>
                <td>
                  {itemStock.totalQuantity}
                  <span className="text-muted font-weight-bold d-block">
                    available in : {itemStock.item.itemCapacity}{" "}
                    {itemStock.storageUnitId}
                  </span>
                </td>
                <td>{itemStock.item.unitPrice}</td>
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
