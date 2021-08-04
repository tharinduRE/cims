import { subDays } from "date-fns";
import React, { useEffect, useReducer } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsBag, BsFlag, BsShield, BsStar } from "react-icons/bs";
import fetchApi from "../service/Axios";
import { AuthContext } from "../pages/auth/AuthProvider";
import { authStores } from "../_helpers/AuthStoreHelper";

export default function StatsCard() {
  const { state: authState } = React.useContext(AuthContext);
  const stores = authState.user.authStores;

  const statReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return state.map((item, i) =>
          item.id === action.payload.id ? { ...item, count: action.payload.count } : item
        );
      default:
        return state;
    }
  };

  const initialState = [
    { name: "Total Items", id: 1, count: 0, icon: <BsShield />, color: "info" },
    { name: "Total Orders", id: 2, count: 0, icon: <BsBag />, color: "warning" },
    { name: "New Items", id: 3, count: 0, icon: <BsStar />, color: "success" },
    { name: "Issued in last 24 Hrs.", id: 4, count: 0, icon: <BsFlag />, color: "danger" },
  ];

  const [state, dispatch] = useReducer(statReducer, initialState);

  const getItemCount = async () => {
    const res = await fetchApi.get(`/items/count?${authStores(stores)}`);
    dispatch({ type: "UPDATE", payload: { id: 1, count: res.data } });
  };

  const getOrderCount = async () => {
    const res = await fetchApi.get(`/orders/count`);
    dispatch({ type: "UPDATE", payload: { id: 2, count: res.data } });
  };

  const last24Hours = subDays(new Date(), 1).toISOString();
  const last7Days = subDays(new Date(), 7).toISOString();

  const getIssueCount = async () => {
    const res = await fetchApi.get(
      `/transactions/count?transactionType.equals=ISSUE&transactionDate.greaterThan=${last24Hours}`
    );
    dispatch({ type: "UPDATE", payload: { id: 4, count: res.data } });
  };

  const getNewItems = async () => {
    const res = await fetchApi.get(`/items/count?createdOn.greaterThan=${last7Days}`);
    dispatch({ type: "UPDATE", payload: { id: 3, count: res.data } });
  };

  useEffect(() => {
    getItemCount();
    getIssueCount();
    getOrderCount();
    getNewItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mb-3 card-custom">
      <Card.Header className="border-0 pb-0 h-50px">
      <Card.Title>
          <h4 className="font-weight-bolder mb-0 text-uppercase">Inventory Summary </h4>
        </Card.Title>
      </Card.Header>
      <Card.Body className="pt-0">
        <Row>
          {state.map((stat, idx) => (
            <Col key={idx}>
              <StatCard
                name={stat.name}
                value={stat.count}
                icon={stat.icon}
                color={stat.color}
                key={idx}
              />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export function StatCard({ name, value, icon, color }) {
  return (
    <div className="d-flex align-items-center mr-2 p-2 border rounded">
      <div className={`symbol symbol-50 symbol-light-${color} mr-5`}>
        <span className="symbol-label font-size-h3"> {icon}</span>
      </div>
      <div className="d-flex flex-column">
        <span className="font-size-h2 text-dark-75 font-weight-bolder">{value}</span>
        <span className="font-size-sm text-info font-weight-bold text-uppercase">{name}</span>
      </div>
    </div>
  );
}
