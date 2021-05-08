import React from 'react'
import { Button } from 'react-bootstrap'
import { ModalLink, Spacer } from '../../components'

export default function orderActions({value,row}) {
    return(<div>
        <Button size='sm' as={ModalLink} path={`/items/${row.original.id}/order/new`} variant="success">Add Item</Button>
        <Spacer x={2}/>
        <Button size='sm' variant="outline-danger">Cancel</Button>
    </div>)
}
