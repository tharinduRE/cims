import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Spacer } from '../../components'

export default function orderActions({value,row}) {
    return(<div>
        <Button size='sm' as={Link} to={`/item/${row.original.itemStockId}/order`} variant="success">Add Item</Button>
        <Spacer x={2}/>
        <Button size='sm' variant="outline-danger">Cancel</Button>
    </div>)
}
