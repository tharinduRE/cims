import { Formik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import ModalCard from "../../components/ModalCard";

export default function VendorForm() {
  const schema = {};
  return (
    <ModalCard>
      <Formik
        validationSchema={schema}
        initialValues={{
          store: "",
        }}
        onSubmit
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
          isValid,
        }) => <Form noValidate onSubmit={handleSubmit}></Form>}
      </Formik>
    </ModalCard>
  );
}
