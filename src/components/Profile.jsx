import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { StoreContext, saveUserDetails } from "./StoreContext";

function OrdersTable(props) {
  return (
    <Col>
      <h3 className="p-3 text-center">Your order history:</h3>
      <Table responsive="sm" hover bordered>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Shipping Method</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, idx) => {
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
                <td>{order.totalPrice}$</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}

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
function Profile() {
  const [isAdmin, setAdmin] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isError, setError] = useState(false);
  const [user, setUser] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [store] = useContext(StoreContext);
  useEffect(() => {
    if (store.user === {} || store.token === "") {
      setError(true);
    } else {
      setUser(store.user);
      if (store.user.type === "1") {
        setAdmin(true);
      }
    }
  }, []);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/${store.user._id}`
      );
      setOrders(data);
    };
    getOrders();
  }, []);
  const logOut = () => {
    window.location.replace("/");
    sessionStorage.clear();
  };

  const updateUser = async (userData) => {
    disableEdit();
    for (const [key, value] of Object.entries(userData)) {
      if (!value || value.length <= 0) {
        delete userData[key];
      }
    }
    if (userData === {}) {
      return;
    }
    const newUser = { ...userData, _id: user._id };
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/update`,
      newUser
    );
    saveUserDetails(data.user, store.token, true);
  };

  const enableEdit = () => {
    Array.from(document.querySelectorAll("input.ud")).forEach(
      (el) => (el.disabled = false)
    );
    setEdit(true);
  };

  const disableEdit = () => {
    Array.from(document.querySelectorAll("input.ud")).forEach(
      (el) => (el.disabled = true)
    );
    setEdit(false);
  };

  return (
    <Container fluid>
      {isError ? (
        <Sorry />
      ) : (
        <>
          <Row className="p-3">
            <h1 className="m-auto">{`${user.FName}'s Profile`}</h1>
          </Row>
          <Row>
            <div className="m-auto">
              <Button
                variant="dark"
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </Button>
              {isAdmin && (
                <Button variant="dark ml-2" href="/admin">
                  Admin Page
                </Button>
              )}
            </div>
          </Row>
          <Row className="mb-2">
            <Col lg={4}>
              <div className="p-3" id="profilePic">
                <img
                  src="https://via.placeholder.com/400"
                  id="userImg"
                  alt="profile-pic"
                />
              </div>
            </Col>
            <Col lg={8}>
              <Form className="form" onSubmit={handleSubmit(updateUser)}>
                <Button variant="dark float-right ml-1" onClick={enableEdit}>
                  Click to Edit
                </Button>
                {isEdit && (
                  <Button type="submit" variant="dark float-right">
                    Save Changes
                  </Button>
                )}
                <h3>Your user details:</h3>
                <Form.Row className="mb-1 p-2">
                  <Col>
                    <Form.Label htmlFor="FName">First Name</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      type="text"
                      id="FName"
                      name="FName"
                      disabled
                      defaultValue={user.FName}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="LName">Last Name</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      type="text"
                      name="LName"
                      id="LName"
                      disabled
                      defaultValue={user.LName}
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mb-1 p-2">
                  <Col>
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      name="address"
                      id="address"
                      type="text"
                      disabled
                      defaultValue={user.address}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="address2">Address 2</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      type="text"
                      id="address2"
                      name="address2"
                      disabled
                      defaultValue={user.address2}
                    />
                  </Col>
                </Form.Row>
                <Form.Row className="mb-1 p-2">
                  <Col>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      className="form-control"
                      custom
                      type="email"
                      id="email"
                      name="email"
                      disabled
                      defaultValue={user.email}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="password">New Password</Form.Label>
                    <Form.Control
                      ref={register({ minLength: 8 || 0 })}
                      className="form-control"
                      custom
                      type="password"
                      id="password"
                      name="password"
                      disabled
                      defaultValue=""
                    />
                    {errors.password && (
                      <span className="invalid-feedback d-block ml-2">
                        Minimum length is 8, leave empty if you don't want to
                        chagne
                      </span>
                    )}
                  </Col>
                </Form.Row>
                <Form.Row className="mb-1 p-2">
                  <Col>
                    <Form.Label htmlFor="country">Country</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      id="country"
                      name="country"
                      type="text"
                      disabled
                      defaultValue={user.country}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="zipcode">Zipcode</Form.Label>
                    <Form.Control
                      ref={register}
                      className="ud form-control"
                      custom
                      id="zipcode"
                      name="zipcode"
                      type="text"
                      disabled
                      defaultValue={user.zipcode}
                    />
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <OrdersTable orders={orders} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Profile;
