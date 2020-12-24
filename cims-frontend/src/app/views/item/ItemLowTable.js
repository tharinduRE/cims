import React, { useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import BTablePagination from "../../components/table/BTablePagination";
import ItemOrder from "../order/ItemOrder";
import { authStoresEquals } from "../../_helpers";

export default function ItemLowTable() {

  const [showModel, setshowModel] = useState({ show: false, id: 0 });

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Item Name",
        accessor: "itemName",
        Cell: ({ row, value }) => {
          return (
            <>
              <div className="font-weight-bold">{value}</div>
              <div className="d-flex">
                <Badge variant="light">{row.original.store.name}</Badge>
              </div>
            </>
          );
        },
      },
      {
        Header: "Available In",
        accessor: "itemCapacity",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.itemCapacity} {row.original.storageUnit}
            </>
          );
        },
      },
      {
        Header: "Available Quantity",
        accessor: "totalQuantity",
        Cell: ({ value }) => {
          return value;
        },
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice",
        Cell: ({ value }) => {
          return <>Rs. {value.toFixed(2)}</>;
        },
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }) => {
          return actionColumnFormatter({
            showDialog: () => setshowModel({ show: true, id: row.original.id }),
          });
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <BTablePagination
        columns={columns}
        dataUrl={`/items/low?${authStoresEquals()}`}
        pagination
      />
      <Modal
        show={showModel.show}
        onHide={() => setshowModel({ show: false, id: 0 })}
        dialogClassName="modal-90w"
        animation={false}
        aria-labelledby="add-item-dialog"
      >
        <Modal.Body className="p-0">
          <ItemOrder itemId={showModel.id} onCancel={()=> setshowModel({ show: false, id: 0 })} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export function actionColumnFormatter({showDialog}) {
  return (
    <>
      <Button variant="info" size="sm" onClick={() => showDialog()}>
        Reorder
      </Button>
    </>
  );
}
