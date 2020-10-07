import React, { useEffect } from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import searchService from "../service/searchService";

export default function SearchPage() {
  const [searchName, setsearchName] = useState("");

  const [searchResults, setsearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefaults();
    setsearchName(e.target.value);
  };

  const searchForItem = (params) => {
    searchService
      .search(params)
      .then((response) => {
        setsearchResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchForItem(searchName);
  }, [searchName]);

  return (
    <>
      <Row>
        <Col>
          <Card className="card card-custom shadow-sm">
            <Card.Body className="rounded p-0 d-flex bg-light">
              <div className="d-flex flex-column flex-lg-row-auto w-auto w-lg-350px w-xl-450px w-xxl-650px py-10 px-10 px-md-20 pr-lg-0">
                <h1 className="font-weight-bolder text-dark mb-0">
                  Search Inventory
                </h1>
                <div className="font-size-h4 mb-8">Get item availability</div>
                <Form
                  className="d-flex flex-center py-2 px-6 bg-white rounded"
                  onSubmit={handleSearch}
                >
                  <Row>
                    <Col lg={6}>
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
                        value={searchName}
                        onChange={(e) => setsearchName(e.target.value)}
                      ></Form.Control>
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
              <div
                className="d-none d-md-flex flex-row-fluid"
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/images/search-header-bg.svg"
                  })`,
                  backgroundPositionX: "right",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  flex: "1 auto",
                }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {searchResults.length !== 0 ? (
        <Row className="mt-5 scroll">
          <h3>Search Results</h3>
          <Col lg={6} className="ml-5">
            {searchResults.map((items, index) => (
              <Card key={index} className="my-2">
                <Card.Body className="">
                  <Card.Title className="font-weight-bold">
                    {items.item.itemName}
                  </Card.Title>
                  <Card.Subtitle>
                    {items.item.casNumber}
                  </Card.Subtitle>
                  <ListGroup className="ml-4 list-group-horizontal">
                    <ListGroupItem>
                      Store :{" "}
                      <Badge className="bg-info">{items.stockStore}</Badge>
                      <Badge className="bg-light text-dark">
                        {items.itemStatus}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                      Total Quantity :{" "}
                      <Badge className="badge bg-success">
                        {items.totalQuantity}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                      Item Capacity :{" "}
                      <Badge className="badge bg-warning text-dark">
                        {items.item.itemCapacity}
                      </Badge>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      ) : (
        <div>No search results</div>
      )}
    </>
  );
}
