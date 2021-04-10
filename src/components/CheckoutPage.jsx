import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "./StoreContext";
import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabPane,
  MDBTabContent,
} from "mdbreact";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

function CheckoutPage() {
  const [store, updateStore] = useContext(StoreContext);
  const vat = store.cart.totalPrice * 0.17;
  const finalPrice = store.cart.totalPrice + vat;

  const [order, setOrder] = useState({
    time: "",
    productIDs: [],
    address: "",
    userID: "",
    shippingMethod: "",
    totalPrice: "",
    quantity: 1,
  });

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [address, setAddress] = useState("");
  const [toRegister, setRegister] = useState(false);
  const [activePill, setActivePill] = useState("1");
  const [isCheckout, setCheckout] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { register: addressRef, errors: addrErrors } = useForm();

  useEffect(() => {
    if (store.isLoggedIn) {
      setActivePill("3");
      setAddress(store.user.address);
    }
  }, []);
  const isCountry = (country: string) => country !== "Country...";
  let type = `${toRegister ? "2" : "3"}`;
  const onSubmit = async (user) => {
    try {
      let userType = `${toRegister ? "signup" : "guest"}`;
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/${userType}`,
        user
      );
      updateStore({ ...store, user: { ...data.user } });
      setActivePill("3");
      setAddress(user.address);
    } catch (err) {
      setIsError(true);
      setError(err.response);
    }
  };

  const handleCheckout = () => {
    const didCheck = document.querySelector('input[name="address"]:checked');
    if (!didCheck) {
      setIsChecked(true);
    } else {
      commitCheckout();
    }
  };

  useEffect(() => {
    const onCheckout = async () => {
      if (order.productIDs.length > 0) {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, order);
        setIsDone(true);
        localStorage.removeItem("cart");
      } else return;
    };
    onCheckout();
  }, [order]);

  const commitCheckout = async () => {
    let shipMet = "";
    document.querySelector('input[name="shipping"]:checked')
      ? (shipMet = document.querySelector('input[name="shipping"]:checked')
          .value)
      : (shipMet = "Regular");
    setOrder({
      ...order,
      productIDs: store.cart.cartItems.map((item) => item._id),
      userID: store.user._id,
      totalPrice: finalPrice,
      time: new Date().toLocaleString("en-GB"),
      shippingMethod: shipMet,
      address: address,
    });
    await axios.post(`${process.env.REACT_APP_BASE_URL}/contact/order`, store);
  };

  useEffect(() => {
    activePill === "3" ? setCheckout(true) : setCheckout(false);
  }, [activePill]);

  function handleClick(event) {
    let { id } = event.target;
    id = id.toString();
    if (activePill === id) {
      return;
    }
    if (activePill === "3") {
    }
    setActivePill(id);
  }
  const PayPalBtnStyle = {
    color: "black",
    tagline: false,
  };

  return (
    <Container fluid>
      <Row className="my-2">
        <Card className="w-100">
          <Card.Body>
            <Row>
              {!isDone ? (
                <Col lg={8} className="mb-4">
                  {/*Tabs Navbar*/}
                  <MDBNav color="dark" className="nav-justified">
                    <MDBNavItem>
                      <MDBNavLink to="#">
                        <strong
                          id="1"
                          className={activePill === "1" ? "active" : ""}
                          onClick={handleClick}
                        >
                          1. Identify
                        </strong>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#">
                        <strong
                          id="2"
                          className={activePill === "2" ? "active" : ""}
                          onClick={handleClick}
                        >
                          2. Billing
                        </strong>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#">
                        <strong
                          id="3"
                          className={activePill === "3" ? "active" : ""}
                          onClick={handleClick}
                        >
                          3. Shipping
                        </strong>
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                  <MDBTabContent className="pt-4" activeItem={activePill}>
                    {/*Tab 1 - Identify*/}
                    <MDBTabPane tabId="1">
                      <Row>
                        <Col lg={6}>
                          <Card className="mb-1">
                            <Card.Body>
                              <Card.Text>
                                We encourage you to register to our club for
                                exclusive offers and discounts!
                              </Card.Text>
                              <MDBBtn
                                color="dark"
                                size="md"
                                block
                                href="/signup"
                                className="btn-a"
                              >
                                Click to Register
                              </MDBBtn>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={6}>
                          <Card className="mb-1">
                            <Card.Body>
                              <Card.Text>
                                If you already registered we advise you to login
                                before placing your order
                              </Card.Text>
                              <MDBBtn
                                color="dark"
                                size="md"
                                block
                                href="/login"
                                className="btn-a"
                              >
                                Click to Login
                              </MDBBtn>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Row className="m-auto p-2">
                          <Col>
                            <small>
                              If you wish to complete your order as a guest
                              please click Next Step
                            </small>
                          </Col>
                        </Row>
                      </Row>
                      <hr className="mb-3" />
                      <MDBBtn
                        color="dark"
                        size="lg"
                        block
                        id="2"
                        onClick={handleClick}
                      >
                        Next step
                      </MDBBtn>
                    </MDBTabPane>
                    {/*Tab 2 - Billing info*/}
                    <MDBTabPane tabId="2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                          <Col md={6} className="mb-4">
                            <label htmlFor="FName">First name</label>
                            <input
                              type="text"
                              id="FName"
                              name="FName"
                              placeholder="Enter your first name"
                              className="form-control"
                              ref={register({ required: true })}
                            />
                            {errors.FName && (
                              <span className="invalid-feedback d-block">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col md={6} className="mb-2">
                            <label htmlFor="LName">Last name</label>
                            <input
                              type="text"
                              id="LName"
                              name="LName"
                              placeholder="Enter your last name"
                              className="form-control"
                              ref={register({ required: true })}
                            />
                            {errors.LName && (
                              <span className="invalid-feedback d-block">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col>
                            <div className="mb-4">
                              <label htmlFor="email">Email</label>
                              <input
                                type="text"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter your email address - yourmail@example.com"
                                ref={register({ required: true })}
                              />
                              {errors.email && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                              {isError && (
                                <span className="invalid-feedback d-block ml-2">
                                  {`Invalid email address - ${error.data}`}
                                </span>
                              )}
                            </div>
                            <div className="mb-4">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                placeholder="1234 Main St"
                                ref={register({ required: true })}
                              />
                              {errors.address && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <label htmlFor="address2">
                              Address 2 (optional)
                            </label>
                            <input
                              type="text"
                              id="address2"
                              name="address2"
                              className="form-control mb-4"
                              placeholder="Apartment or suite"
                              ref={register}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6} className="mb-4">
                            <label htmlFor="country">Country</label>
                            <select
                              className="custom-select d-block w-100"
                              id="country"
                              name="country"
                              ref={register({
                                required: true,
                                validate: isCountry,
                              })}
                            >
                              <option>Country...</option>
                              <option>United States</option>
                            </select>
                            {errors.country && (
                              <span className="invalid-feedback d-block">
                                This field is required
                              </span>
                            )}
                          </Col>
                          <Col lg={6} className="mb-4">
                            <label htmlFor="zip">Zip</label>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              name="zipcode"
                              ref={register({ required: true })}
                            />
                            {errors.zipcode && (
                              <span className="invalid-feedback d-block">
                                This field is required
                              </span>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          {toRegister && (
                            <Col>
                              <label htmlFor="pass">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="pass"
                                name="password"
                                placeholder="Enter your password"
                                ref={register({ required: true, minLength: 8 })}
                              />
                              {errors.password && (
                                <span className="invalid-feedback d-block">
                                  This field is required - minimum length of 8
                                </span>
                              )}
                            </Col>
                          )}
                        </Row>
                        <hr />
                        <div className="mb-1 ml-4">
                          <input
                            type="checkbox"
                            className="form-check-input filled-in"
                            id="chekboxRules"
                            name="terms"
                            ref={register({ required: true })}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="chekboxRules"
                          >
                            I accept the terms and conditions
                          </label>
                          {errors.terms && (
                            <span className="invalid-feedback d-block">
                              You must check this box
                            </span>
                          )}
                        </div>
                        <div className="mb-1 ml-4">
                          <input
                            type="checkbox"
                            className="form-check-input filled-in"
                            id="register"
                            name="register"
                            onChange={() => {
                              toRegister
                                ? setRegister(false)
                                : setRegister(true);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="register"
                          >
                            Save this information for next time
                          </label>
                        </div>
                        <div className="mb-1 ml-4">
                          <input
                            type="checkbox"
                            className="form-check-input filled-in"
                            id="newsLetter"
                            name="newsLetter"
                            ref={register}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="newsLetter"
                          >
                            Subscribe to the newsletter
                          </label>
                        </div>
                        <hr />
                        <MDBBtn
                          color="dark"
                          size="lg"
                          block
                          id="3"
                          type="submit"
                        >
                          Next step
                        </MDBBtn>
                        <input
                          type="hidden"
                          ref={register}
                          name="type"
                          value={type}
                        />
                      </form>
                    </MDBTabPane>
                    {/*Tab 3 - Shipping info*/}
                    <MDBTabPane tabId="3">
                      <div>Please choose your desired shipping method</div>
                      <div className="d-block my-3">
                        <div className="mb-2 ml-4">
                          <input
                            name="shipping"
                            type="radio"
                            className="form-check-input with-gap"
                            id="regular"
                            value="Regular"
                          />
                          <label className="form-check-label" htmlFor="regular">
                            Regular
                          </label>
                        </div>
                        <div className="mb-2 ml-4">
                          <input
                            name="shipping"
                            type="radio"
                            className="form-check-input with-gap"
                            id="priority"
                            value="Priority"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="priority"
                          >
                            Priority Mail
                          </label>
                        </div>
                        <div className="mb-2 ml-4">
                          <input
                            name="shipping"
                            type="radio"
                            className="form-check-input with-gap"
                            id="express"
                            value="Express"
                          />
                          <label className="form-check-label" htmlFor="express">
                            Express Delivery
                          </label>
                        </div>
                        <small className="d-block ml-2" muted>
                          Note: if you do not choose, Regular shipping will be
                          selected
                        </small>
                        <hr />
                        <form>
                          <Row>
                            <Col md={6} className="mb-3">
                              <div className="mb-1 ml-4">
                                <input
                                  type="checkbox"
                                  className="form-check-input filled-in"
                                  id="checkaddr"
                                  name="address"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="checkaddr"
                                >
                                  Shipping address is same as billing address
                                </label>
                                {isChecked && (
                                  <span className="invalid-feedback d-block">
                                    This field is required - or the form below
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <label htmlFor="address1">Address</label>
                              <input
                                type="text"
                                id="address1"
                                className="form-control mb-4"
                                placeholder="1234 Main St"
                                name="address"
                                ref={addressRef({ required: true })}
                              />
                              {addrErrors.address && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                              <label htmlFor="address-12">
                                Address 2 (optional)
                              </label>
                              <input
                                type="text"
                                id="address-12"
                                className="form-control mb-4"
                                placeholder="Apartment or suite"
                                ref={addressRef}
                                name="address2"
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4} md="12" className="mb-4">
                              <label htmlFor="country2">Country</label>
                              <select
                                className="custom-select d-block w-100"
                                id="country2"
                                name="country"
                                ref={addressRef({ required: true })}
                              >
                                <option>Choose...</option>
                                <option>United States</option>
                              </select>
                              {addrErrors.country && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                            </Col>
                            <Col lg={4} md={6} className="mb-4">
                              <label htmlFor="state">State</label>
                              <select
                                className="custom-select d-block w-100"
                                id="state"
                                name="state"
                                ref={addressRef({ required: true })}
                              >
                                <option>Choose...</option>
                                <option>California</option>
                              </select>
                              {addrErrors.state && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                            </Col>
                            <Col lg={4} md={6} className="mb-4">
                              <label htmlFor="zip2">Zip</label>
                              <input
                                type="text"
                                className="form-control"
                                id="zip2"
                                name="zip"
                                ref={addressRef({ required: true })}
                              />
                              {addrErrors.zip && (
                                <span className="invalid-feedback d-block">
                                  This field is required
                                </span>
                              )}
                            </Col>
                          </Row>
                        </form>
                        <hr className="mb-4" />
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </Col>
              ) : (
                <Col lg={8} className="mb-4">
                  <Row>
                    <h3 className="m-auto p-5">
                      Your order has been completed
                    </h3>
                  </Row>
                  <Row>
                    <a href="/" className="m-auto d-block">
                      <Button variant="dark">Shop More!</Button>
                    </a>
                  </Row>
                </Col>
              )}
              {/*Summary column*/}
              <Col lg={4} className="mb-4">
                <Card className="mb-2">
                  <Card.Body>
                    <h4 className="mb-4 mt-1 h5 text-center font-weight-bold">
                      Summary
                    </h4>
                    <hr />
                    {store.cart.cartItems.length > 0 ? (
                      store.cart.cartItems.map((item, idx) => {
                        return (
                          <>
                            <Row key={idx}>
                              <Col sm={8}>
                                {item.name}
                                <div>
                                  <small className="ml-1">
                                    Materials: {item.material.join(", ")}
                                  </small>
                                </div>
                              </Col>
                              <Col sm={4}>{item.price}$</Col>
                            </Row>
                            <hr />
                          </>
                        );
                      })
                    ) : (
                      <>
                        <Row>
                          <Col>No products in your cart</Col>
                        </Row>
                        <hr />
                      </>
                    )}

                    <Row>
                      <Col sm={8}>
                        <strong>VAT</strong>
                      </Col>
                      <Col sm={4}>
                        <strong>
                          {vat.toFixed(2) > 0 ? vat.toFixed(2) : 0} $
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <strong>Coupon:</strong> FS2021 -15%
                      </Col>
                      <Col sm={4}>
                        <strong>-84.2$</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <strong>Total</strong>
                      </Col>
                      <Col sm={4}>
                        <strong>{finalPrice > 0 ? finalPrice : 0} $</strong>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>
                    <Form.Label htmlFor="coupon">
                      Voucher/Coupon code
                    </Form.Label>
                    <Form inline className="w-100">
                      <Form.Control
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Enter coupon code"
                      />
                      <Button variant="dark" className="ml-1">
                        Apply code
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                {isCheckout && (
                  <div>
                    <Button
                      variant="dark"
                      className="w-100 mb-3 p-2"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                    <PayPalButton style={PayPalBtnStyle} />
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
