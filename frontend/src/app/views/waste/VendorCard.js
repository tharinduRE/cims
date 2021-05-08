import React from 'react'
import { Button } from 'react-bootstrap'
import { BsGem } from 'react-icons/bs'
import FormCard from '../../components/FormCard'
import {ModalLink} from '../../components'
export default function VendorCard() {
    return (
      <FormCard
        title="Waste Chemical Vendor"
        subtitle="Manage vendors who recieve waste products"
        icon={BsGem}
        variant="dark"
      >
        <Button variant="dark" as={ModalLink} path="/waste/vendor/new" block>Add a Vendor</Button>
      </FormCard>
    );
}
