import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { toAbsoluteUrl } from "../_helpers/AssetHelpers";

export function HazardLabel(props) {

  let labels = [
    { id: 0, label: "exclam.svg" },
    { id: 1, label: "acid.svg" },
    { id: 2, label: "bottle.svg" },
    { id: 3, label: "explos.svg" },
    { id: 4, label: "flamme.svg" },
    { id: 5, label: "pollu.svg" },
    { id: 6, label: "rondflam.svg" },
    { id: 7, label: "silhouette.svg" },
    { id: 8, label: "skull.svg" },
  ];

  const [hazardLabels, setHazardLabels] = useState([0]);
  
  useEffect(()=> {
      if(props.labels){
        setHazardLabels(props.labels);
      }
  },[props.labels])

  return (
    <>{hazardLabels.map( (label,idx) => (
        <Image className="ml-1" key={idx} width={60} src={toAbsoluteUrl(/ghs-labels/)+labels[label].label} />
    ))}
    </>
  );
}
