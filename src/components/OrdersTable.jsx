import { useState, useEffect } from "react";
import { Table, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order`
      );
      setOrders(data);
    };
    getData();
  }, []);
  return (
    <Col>
      <Form inline>
        <div className="m-auto p-3">
          <Form.Control
            type="text"
            placeholder="Enter order ID"
            className="mr-sm-1"
          />
          <Button size="sm" variant="outline-dark">
            Search
          </Button>
        </div>
      </Form>
      <Table responsive="sm" hover bordered>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Shipping Method</th>
            <th>user ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => {
            return (
              <tr>
                <td>{order._id.substring(15)}</td>
                <td>{order.time}</td>
                <td>
                  {order.productIDs
                    .map((el) => el.slice(el.length - 4))
                    .join(", ")}
                </td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{order.shippingMethod}</td>
                <td>{order.userID.substring(15)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}

export default OrdersTable;
