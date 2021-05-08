import React from "react";
import { formatDate, timeAgo } from "../../../_helpers/DateFormatHelper";
import Avatar from "./Avatar";
import userActionColumnFormatter from "./userActionColumnFormatter";
import { AuthContext } from "../../../pages/auth/AuthProvider";
import userAuthColFormatter from "./userAuthColFormatter";
import userStoreColFormatter from "./userStoreColFormatter";
import BTablePagination from "../../../components/table/BTablePagination";

export default function UserTable() {
  const { state: AuthState } = React.useContext(AuthContext);
  const authUser = AuthState.user;

  const columns = [
    {
      Header: "Name",
      accessor: "firstName",
      Cell: ({ row }) => {
        return (
          <div className="d-flex align-items-center">
            <Avatar avatarUrl={row.original.avatarUrl} />
            <div className="flex-column text-left pl-3">
              <span className="d-block">{`${row.original.firstName} ${row.original.lastName}`}</span>
              <span className="text-muted">{row.original.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      Header: "Post Title",
      accessor: "postTitle",
    },
    {
      Header: "Authority",
      accessor: "authorities",
      Cell: ({ value }) => {
        return userAuthColFormatter({ value });
      },
    },
    {
      Header: "Authorized Stores",
      accessor: "authStores",
      Cell: ({ value }) => {
        return userStoreColFormatter({ value });
      },
    },
    {
      Header: "Created On",
      accessor: "createdOn",
      Cell: ({ value }) => {
        return (
          <>
            <span>{formatDate(value)}</span>
            <span className="d-flex text-muted">{timeAgo(value)}</span>
          </>
        );
      },
    },
    {
      Header: "Actions",
      accessor: "email",
      Cell: ({ row }) => {
        return userActionColumnFormatter({ row, authUser });
      },
    },
  ];

  return <BTablePagination columns={columns} dataUrl={`/users`} />;
}
