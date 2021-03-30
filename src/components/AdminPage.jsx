import { useState } from "react";
import OrdersTable from "./OrdersTable";
import UsersTable from "./UsersTable";
import ProdForms from "./AdminForms";
import { Container, Row, Col, Button } from "react-bootstrap";

function AdminPage() {
  const [showUsers, setUsers] = useState(false);
  const [showOrders, setOrders] = useState(false);
  const [showProds, setProds] = useState(false);

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
    </Container>
  );
}

export default AdminPage;
