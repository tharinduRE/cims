import React from 'react'
import { Link, useLocation } from "react-router-dom";

export const ModalLink = ((props) => {
  const location = useLocation();
  return (
    <Link
      className={props.className}
      to={{
        pathname: props.path,
        state: { background: location },
      }}
    >{props.children}</Link>
  );
});