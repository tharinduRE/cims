import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import ItemIssue from "../views/item/ItemIssue";
import Axios from "../service/Axios";
import { AuthContext } from "./auth/AuthProvider";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage({ props }) {
  const query = useQuery().get("q");

  const [showModel, setShowModel] = useState({
    show: false,
    id: 1,
  });

  const onUpdate = () => {
    setShowModel({ show: false });
  };

  const { state: authState } = React.useContext(AuthContext);
  const authStores =  authState.user.authStores;

  const searchStores = (stores = authStores) => {
    let searchStores = stores.map((store) => store.id);
    if (searchStores.length > 0 && searchStores.length != null) {
      return `&storeIds=${searchStores.join(`&storeIds=`)}`;
    }
  };

  const [searchResults, setsearchResults] = useState([]);

  const searchForItem = async (name) => {
    try {
      const res = await Axios.get(`/items/_search?itemName=${name}&${searchStores()}`);
      setsearchResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query != null) {
      searchForItem(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <Row className="mt-5 justify-content-center">
        {searchResults.length > 0 ? (
          <Col lg={10} xl={10} className="px-lg-5">
            <h3>Search Results</h3>

            {searchResults.map((item, index) => (
              <ResultCard
                key={index}
                item={item}
                showModel={(id) => setShowModel({ show: true, id: id })}
              />
            ))}
          </Col>
        ) : (
          <Col xl={8}>
            <div
              className="d-flex d-md-flex flex-row-fluid py-20"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/gummy-chemistry-lab.svg"
                })`,
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <div className="d-flex justify-content-center">
              <h5>
                {" "}
                {!(query > 0) ? "Start Searching by typing item name ..." : "No search Results"}
              </h5>
            </div>
          </Col>
        )}
      </Row>
      <Modal
        show={showModel.show}
        onHide={() => setShowModel({ show: false, id: 0 })}
        dialogClassName="modal-90w"
        animation={false}
        aria-labelledby="add-item-dialog"
      >
        <Modal.Body className="p-0">
          <ItemIssue onComplete={() => onUpdate()} itemId={showModel.id} />
        </Modal.Body>
      </Modal>
    </>
  );
}
