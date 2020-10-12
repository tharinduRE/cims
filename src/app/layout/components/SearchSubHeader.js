import React, { useState } from "react";
import { Button, Col,Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function SearchSubHeader() {

  const [query, setquery] = useState("");

  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.length > 0){
      history.push("/search?q="+query);
    }
  };
  
  const handleInputChange = (e) => {
     setquery(e.target.value);
  };

  return (
    <div
      className="subheader gutter-b subheader-transparent"
      style={{
        backgroundColor: "#512788",
        height:"85px"
      }}
    >
      <div className="d-flex flex-column flex-lg-row-auto w-auto w-lg-350px w-xl-450px w-xxl-650px py-2 px-10 px-md-20 pr-lg-0">
        <Form
          className="d-flex flex-center py-2 px-6 bg-white rounded"
          onSubmit={handleSearch}
        >
          <Row>
            <Col lg={4}>
              <Form.Control
                type="text"
                className="form-control border-0 font-weight-bold pl-2"
                placeholder="Search by CAS Number"
              ></Form.Control>
              <span className="bullet bullet-ver h-25px d-none d-sm-flex mr-2"></span>
            </Col>

            <Col lg={4}>
              <Form.Control
                type="text"
                className="form-control border-0 font-weight-bold pl-2"
                placeholder="Search by Name"
                onChange={handleInputChange}
              ></Form.Control>
            </Col>
            <Col lg={2}>
              <Link to="/browse">
              <Button variant="light">Browse</Button>
              </Link>
            </Col>

            <Col lg={2}>
              <Button
                type="submit"
                className="btn btn-dark font-weight-bold btn-hover-light-primary mt-3 mt-sm-0 px-7"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
