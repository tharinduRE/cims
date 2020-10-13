import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import searchService from "../service/searchService";
import SearchCard from "../views/components/SearchCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage(props) {
  const [searchName, setsearchName] = useState("");
  const [casNumber, setCasNumber] = useState(0);

  const query = useQuery().get("q");

  const [searchResults, setsearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefaults();
    setsearchName(e.target.value);
  };

  const searchForItem = (name) => {
    searchService
      .searchByName(name)
      .then((response) => {
        setsearchResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (query != null) {
      searchForItem(query);
    }

    if (searchName) {
      searchForItem(searchName);
    }
  },[searchName, query]);

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
                        onChange={(e) => setCasNumber(e.target.value)}
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
                      <Dropdown>
                        <Dropdown.Toggle className="btn-light">
                          Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
      <Row className="mt-5 justify-content-md-center">
        {searchResults.length > 0 ? (
          <Col md={8} className="px-lg-5">
            <h3>Search Results</h3>

            {searchResults.map((item, index) => (
              <SearchCard key={index} item={item} />
            ))}
          </Col>
        ) : (
          <div>No search results</div>
        )}
      </Row>
    </>
  );
}
