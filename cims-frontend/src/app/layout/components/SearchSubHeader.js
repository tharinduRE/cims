import React, { Fragment, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { BsFillGridFill, BsSearch } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import fetchApi from "../../service/Axios";
import { Formik } from "formik";
import { AuthContext } from "../../pages/auth/AuthProvider";

export default function SearchSubHeader() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const history = useHistory();

  const { state: authState } = React.useContext(AuthContext);
  const authStores =  authState.user.authStores;

  const searchStores = (stores = authStores) => {
    let searchStores = stores.map((store) => store.id);
    if (searchStores.length > 0 && searchStores.length != null) {
      return `&storeIds=${searchStores.join(`&storeIds=`)}`;
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const res = await fetchApi.get(`/items/_search?itemName=${query}&${searchStores()}`);
      setResults(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResults = (values) => {
    if (values) {
      history.push("/search?q=" + values.query);
    }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  useEffect(() => {
    if (searchValue.length > 0) {
      history.push("/search?q=" + searchValue);
    }
  }, [searchValue, history]);

  return (
    <div
      className="subheader gutter-b subheader-transparent"
      style={{
        backgroundColor: "#512788",
        height: "72px",
      }}
    >
      <div className="container d-flex flex-column">
        <div className="d-flex align-items-md-center my-2 flex-column flex-md-row">
          <div className="bg-white rounded p-3 d-flex flex-grow-1 flex-sm-grow-0">
            <Formik initialValues={{ query: "" }} onSubmit={handleResults}>
              {({ handleSubmit, handleChange, setFieldValue, isSubmitting, values, errors }) => (
                <Form
                  className=" d-flex align-items-md-center flex-sm-row flex-column flex-grow-1 flex-sm-grow-0"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex align-items-center py-3 py-sm-0 px-sm-3">
                    <BsSearch />
                    <AsyncTypeahead
                      filterBy={filterBy}
                      id="async-example"
                      isLoading={isLoading}
                      labelKey="itemName"
                      minLength={3}
                      clearButton={true}
                      className="w-350px"
                      onKeyDown={(e) => {
                        if (e.isComposing || e.keyCode === 13) {
                          handleSubmit();
                        }
                      }}
                      onInputChange={(input, e) => {
                        setFieldValue("query", input);
                        handleChange("query");
                      }}
                      onChange={(arr) => {
                        Array.isArray(arr) && arr.length
                          ? setsearchValue(arr[0].itemName)
                          : setsearchValue("");
                      }}
                      onSearch={handleSearch}
                      renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                        <Form.Control
                          {...inputProps}
                          className="border-0 font-weight-bold pl-2"
                          ref={(node) => {
                            inputRef(node);
                            referenceElementRef(node);
                          }}
                        />
                      )}
                      options={results}
                      placeholder="Search for a Inventory Item..."
                      renderMenuItemChildren={(result) => (
                        <Fragment>
                          <span>
                            {result.itemName}{" "}
                            <Badge variant="light">
                              {result.itemCapacity}
                              {result.storageUnit}
                            </Badge>
                          </span>
                        </Fragment>
                      )}
                    />
                  </div>
                  <Button as={Link} to="/items/all" variant="light">
                    {" "}
                    <BsFillGridFill /> Browse
                  </Button>

                  <Button
                    type="submit"
                    variant="dark"
                    className="font-weight-bold btn-hover-light-primary mt-3 mt-sm-0 px-7 mx-3"
                  >
                    Search
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
