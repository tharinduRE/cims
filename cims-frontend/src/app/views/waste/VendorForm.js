import React from 'react'
import { BsGem } from 'react-icons/bs'
import FormCard from '../../components/FormCard'

export default function VendorForm() {
    return (
      <FormCard
        title="Waste Chemical Vendor"
        subtitle="Manage vendors who recieve waste products"
        icon={BsGem}
        variant="dark"
      ></FormCard>
    );
}
