import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { timeAgo } from "../../_helpers/DateFormatHelper";

export default function NotifyCenter() {
  const nots = [
    { timestamp: new Date(), content: "No new Notifications" },
    { timestamp: new Date(), content: "Hey Nice person ! This stuff is still developing" },
  ];
  return (
    <Dropdown size="xl">
      <Dropdown.Toggle as="a" bsPrefix=" ">
        <BsBell size="1.5rem" />
      </Dropdown.Toggle>
      <Dropdown.Menu align="right">
        <Dropdown.Header> Recent Notifications</Dropdown.Header>
        {nots.map((n, i) => (
          <Notification text={n.content} time={n.timestamp} key={i}/>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
function Notification({ text, time ,key}) {
  return (
    <Dropdown.Item eventKey={key}>
      <div className="d-flex">
        <Col className="text-info w-100">{text}</Col>
        <small className="ml-auto ">{timeAgo(time)}</small>
      </div>
    </Dropdown.Item>
  );
}
