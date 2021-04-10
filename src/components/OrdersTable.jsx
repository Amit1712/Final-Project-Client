import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const [showReset, setReset] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/order`);
    setOrders(data);
  };

  const onSubmit = (id) => {
    const orderToShow = orders.filter((order) => order._id.includes(id.id));
    setOrders(orderToShow);
    setReset(true);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Col>
      <Form inline onSubmit={handleSubmit(onSubmit)}>
        <div className="m-auto p-3">
          <Form.Control
            id="order_id"
            ref={register({ required: true })}
            type="text"
            name="id"
            placeholder="Enter order ID"
            className="mr-sm-1"
          />
          <Button size="sm" variant="outline-dark" type="submit">
            Search
          </Button>
          {showReset && (
            <Button
              size="sm"
              variant="outline-dark ml-2"
              onClick={() => {
                getData();
                document.querySelector("#order_id").value = "";
                setReset(false);
              }}
            >
              Reset
            </Button>
          )}
          {errors.id && (
            <span className="invalid-feedback d-block ml-2">
              This field is required
            </span>
          )}
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
              <tr key={idx}>
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
