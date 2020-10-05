import React from 'react'
import { Button } from 'react-bootstrap'

export default function SearchPage() {
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card-body">
                    Advanced Search
                    <Button className="btn btn-outline-secondary">Search</Button>    
                </div> 
            </div>
        </div>
    )
}
