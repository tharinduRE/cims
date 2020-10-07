import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

export default function HazardLabel(props) {
  let labelUrl = process.env.PUBLIC_URL + "/ghs-labels/";

  let labels = [
    { id: 0, label: "GHS-pictogram-exclam.svg" },
    { id: 1, label: "GHS-pictogram-acid.svg" },
    { id: 2, label: "GHS-pictogram-bottle.svg" },
    { id: 3, label: "GHS-pictogram-explos.svg" },
    { id: 4, label: "GHS-pictogram-flamme.svg" },
    { id: 5, label: "GHS-pictogram-pollu.svg" },
    { id: 6, label: "GHS-pictogram-rondflam.svg" },
    { id: 7, label: "GHS-pictogram-silhouette.svg" },
    { id: 8, label: "GHS-pictogram-skull.svg" },
  ];

  const [hazardLabels, setHazardLabels] = useState([0]);
  
  useEffect(()=> {
      if(props.labels){
        setHazardLabels(props.labels);
      }
  },[props.labels])

  return (
    <>{hazardLabels.map( (label,idx) => (
        <Image className="ml-1" key={idx} width={60} src={labelUrl+labels[label].label} />
    ))}
    </>
  );
}
