import React from "react";
import { Image } from "react-bootstrap";


export default function Avatar({ avatarUrl }) {

  return <Image src={avatarUrl} height={50} width={50} roundedCircle />;
}
