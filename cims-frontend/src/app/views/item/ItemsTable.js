import React, { useState } from "react";
import { Badge, Modal } from "react-bootstrap";
import BTablePagination from "../../components/table/BTablePagination";
import actionColumnFormatter from "./actionColumnFormatter";
import { formatDate } from "../../_helpers/DateFormatHelper";
import ItemDelete from "./ItemDelete";
import ItemIssue from "./ItemIssue";
import ItemUpdate from "./ItemUpdate";

export default function ItemsTable({ store }) {
  const [showModel, setShowModel] = useState({
    show: false,
    id: 1,
    type: "delete",
  });

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "itemName",
        Cell: ({ row, value }) => {
          return (
            <div>
              <span className="font-weight-bolder">{value}</span>
              <span className="text-muted font-weight-bold d-block">
                CAS : {row.original.casNumber}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "totalQuantity",
        Cell: ({ row, value }) => {
          return (
            <>
              <Badge variant="dark">{value}</Badge>
              <span className="text-info font-weight-bold d-block">
                Available in :{" "}
                <Badge variant="info">
                  {row.original.itemCapacity} {row.original.storageUnit}
                </Badge>
              </span>
            </>
          );
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
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: ({ value }) => {
          return formatDate(value);
        },
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }) => {
          return actionColumnFormatter({
            row,
            openDeleteDiolog: (id) => setShowModel({ type: "delete", id: id, show: true }),
            openEditDiolog: (id) => setShowModel({ type: "edit", id: id, show: true }),
            openIssueDiolog: (id) => setShowModel({ type: "issue", id: id, show: true }),
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
        dataUrl={`/items?storeId=${store}`}
        countUrl={`/items/count?storeId.equals=${store}`}
        pagination
      />
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
              delete: <ItemDelete id={showModel.id} />,
              edit: <ItemUpdate id={showModel.id} update onCancel={() => setShowModel({ show: false })} />,
              issue: (
                <ItemIssue onCancel={() => setShowModel({ show: false })} itemId={showModel.id} />
              ),
            }[showModel.type]
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
