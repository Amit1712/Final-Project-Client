import { useState, useEffect, useContext } from "react";
import OrdersTable from "./OrdersTable";
import UsersTable from "./UsersTable";
import ProdForms from "./AdminForms";
import { Container, Row, Col, Button } from "react-bootstrap";
import { StoreContext } from "./StoreContext";

function Sorry() {
  return (
    <div className="p-4 text-center mb-L">
      <h1 className="mt-2 p-3">We're very sorry!</h1>
      <p className="mb-2 p-1">
        Unfortunately to view this page you must be logged in!
      </p>
      <Button variant="dark" href="/login">
        Click to Login
      </Button>
    </div>
  );
}

function AdminPage() {
  const [store] = useContext(StoreContext);
  const [isAdmin, setAdmin] = useState(false);
  const [showUsers, setUsers] = useState(false);
  const [showOrders, setOrders] = useState(false);
  const [showProds, setProds] = useState(false);

  useEffect(() => {
    if (store.user.type === "1") {
      setAdmin(true);
    }
  }, []);

  const handleClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case "users":
        setUsers(true);
        setOrders(false);
        setProds(false);
        break;
      case "orders":
        setOrders(true);
        setUsers(false);
        setProds(false);
        break;
      case "prods":
        setProds(true);
        setUsers(false);
        setOrders(false);
        break;
      default:
        break;
    }
  };
  return (
    <Container fluid>
      {isAdmin ? (
        <>
          <Row>
            <Col className="text-center p-4">
              <h1>Control Panel</h1>
              <h5>Your interactive management hub</h5>
            </Col>
          </Row>
          <Row>
            <div className="m-auto">
              <Button
                variant="dark"
                className="p-2 m-2"
                onClick={handleClick}
                name="users"
              >
                Manage Users
              </Button>
              <Button
                variant="dark"
                className="p-2 m-2"
                onClick={handleClick}
                name="orders"
              >
                Manage Orders
              </Button>
              <Button
                variant="dark"
                className="p-2 m-2"
                onClick={handleClick}
                name="prods"
              >
                Manage Products
              </Button>
            </div>
          </Row>
          <Row>
            <Col lg={12} className="p-4">
              {showOrders && <OrdersTable />}
              {showUsers && <UsersTable />}
              {showProds && <ProdForms />}
            </Col>
          </Row>
        </>
      ) : (
        <Sorry />
      )}
    </Container>
  );
}

export default AdminPage;
