import React from "react";
import { Badge } from "react-bootstrap";

export default function userAuthColFormatter({ value }) {
  return (
    <>
      {value.map(
        (auth, idx) =>
          ({
            ROLE_USER: (
              <Badge variant="primary" key={idx} className="d-block">
                User
              </Badge>
            ),
            ROLE_ADMIN: (
              <Badge variant="danger" key={idx} className="d-block">
                Admin
              </Badge>
            ),
          }[auth])
      )}
    </>
  );
}
