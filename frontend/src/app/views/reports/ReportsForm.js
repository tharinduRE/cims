import React from "react";
import { BsFileEarmark } from "react-icons/bs";
import { AuthContext } from "../../pages/auth/AuthProvider";
import FormCard from "../../components/FormCard";
import { Button, Spinner, Form } from "react-bootstrap";
import axios from "../../service/Axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { Formik } from "formik";
import * as Yup from "yup";
// import Axios from "../../service/Axios";
// import { authStoresEquals } from "../../_helpers/AuthStoreHelper";

export default function ReportsForm(onGenerate) {
  const { state: authState } = React.useContext(AuthContext);
  const stores = JSON.parse(localStorage.getItem('user')).authStores;
  const user = authState.user;

  console.log(stores)

  const generateReport = async (values) => {
    const payload = {
      userId: user.id,
      storeId: values.store[0].id,
    };
    await axios
      .post("/reports", payload)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          onGenerate = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const schema = Yup.object().shape({
    store: Yup.string().required("A Store must select"),
  });
  
  return (
    <FormCard icon={BsFileEarmark} title="Generate Reports">
      <Formik
        validationSchema={schema}
        initialValues={{
          store: "",
        }}
        onSubmit={async (values) => await generateReport(values)}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
          isValid,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Label>Select Store to generate a report</Form.Label>
            <Typeahead
              id="item-store"
              labelKey="name"
              name="store"
              placeholder="Select to generate a report"
              clearButton
              options={stores}
              onChange={(s) => {
                handleChange("store");
                setFieldValue("store", s);
              }}
              isInvalid={errors.store ? true : false}
            />
            <Form.Control.Feedback type="invalid" hidden={!isValid}>
              {errors.store}
            </Form.Control.Feedback>

            <div className="separator separator-dashed my-5"></div>
            <Button className="mr-3" variant="info" type="submit" disabled={isSubmitting} block>
              Generate{" "}
              {isSubmitting ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                ""
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
}
