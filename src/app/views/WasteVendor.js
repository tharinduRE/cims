import React, { useEffect, useState } from "react";
import { Alert,Table } from "react-bootstrap";
import moment from "moment";
import axios from "../service/Axios";

export default function WasteVendor() {

  const [vendorList, setvendorList] = useState([])

   const getvendors = async() => {
     await axios.get(`/waste-vendors?size=5&sort=lastIssuedOn%2Cdesc`).then((response) => {
       setvendorList(response.data);
     }).catch((err) => {
       console.log(err);
     });
   }

    useEffect(() => {
        getvendors();
    }, []);

    return (
        <>
            {vendorList && vendorList.length > 0 ? (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vendor Name</th>
                            <th>Waste Items</th>
                            <th>Last Issued</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorList.map((vendor, index) => (
                            <tr key={index}>
                                <td>
                                    <small>{index + 1}</small>
                                </td>
                                <td>
                                    {vendor.vendorName}
                        <span className="d-flex text-muted">{vendor.vendorAddress}</span>
                                
                                </td>
                                <td>
                                  {vendor.wasteItems.map((item,index)=>(
                                      <span key={index}>{item.id}</span>
                                  ))}
                                </td>

                                <td>
                                    <span>
                                        {moment(vendor.lastIssuedOn).format(
                                            "MMM Do YY, h:mm a"
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert className="alert alert-warning">No vendors found</Alert>
            )}
        </>
    );
}
