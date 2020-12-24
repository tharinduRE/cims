import React from 'react'
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function userStoreColFormatter({value}) {
    return (
        <ListGroup variant="flush">
              {value.map((store, idx) => (
                <ListGroupItem key={idx} className="border-0 p-1">
                  {" "}
                  <Badge variant="light" className="d-block">
                    {store.name}
                  </Badge>
                </ListGroupItem>
              ))}
            </ListGroup>
    )
}
