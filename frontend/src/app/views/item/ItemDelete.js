import React from "react";
import { Card, Alert, Button } from "react-bootstrap";
import itemCrud from "./ItemCrud";
export default function ItemDelete({ id, onHide }) {

  const deleteItem = (Id) => {
    itemCrud
      .deleteOne(Id)
      .then((res) => {
        console.log(res);
        onHide(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Alert>Confirm Delete the item </Alert>
          <div className="d-flex">
            <div className="ml-auto">
              <Button variant="danger" onClick={() => deleteItem(id)}>
                Confirm
              </Button>
              <Button variant="light" onClick={onHide}>
                Cancel
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
