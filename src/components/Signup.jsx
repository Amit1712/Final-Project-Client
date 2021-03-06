import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

function Thanks() {
  return (
    <Container fluid>
      <Row>
        <h2 className="p-5 m-auto mt-5">Thank you for registering!</h2>
      </Row>
      <Row>
        <p className="p-3 m-auto">
          We want to thank you for joining our club and becoming a valued
          customer!
        </p>
      </Row>
      <Row>
        <p className="p-3 m-auto mb-L">
          We invite you to confirm your email address to join our site and enojy
          the full powers of your membership!
        </p>
      </Row>
    </Container>
  );
}

function Signup() {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [display, setDisplay] = useState({
    FName: "",
    LName: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setDisplay((prevVals) => {
      return { ...prevVals, [name]: value };
    });
  }

  const { register, handleSubmit, errors } = useForm();
  const isCountry = (country: string) => country !== "Country...";
  const onSubmit = async (user) => {
    try {
      setSubmitted(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, user);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contact/register`,
        user
      );
    } catch (err) {
      setSubmitted(false);
      setIsError(true);
      setError(err.response);
    }
  };

  return (
    <Container fluid>
      {!isSubmitted ? (
        <Row>
          <Col lg={12} className="p-5">
            <div className="w-fitC m-auto pb-4">
              <h1 className="m-auto p-2">Join our exclusive club!</h1>
              <h5 className="m-auto p-2">
                get great deals and join thousands of happy customers!
              </h5>
            </div>
            <form
              className="form p-3"
              onSubmit={handleSubmit(onSubmit)}
              id="registerForm"
            >
              <div>
                <h2>
                  Welcome {display.FName} {display.LName}
                </h2>
              </div>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="FName"
                    ref={register({ required: true })}
                    value={display.FName}
                    onChange={handleChange}
                  />
                  {errors.FName && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="LName"
                    ref={register({ required: true })}
                    value={display.LName}
                    onChange={handleChange}
                  />
                  {errors.LName && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email address"
                    name="email"
                    ref={register({ required: true })}
                  />
                  {errors.email && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                  {isError && (
                    <span className="invalid-feedback d-block ml-2">
                      {`Invalid email address - ${error.data}`}
                    </span>
                  )}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Choose your password"
                    name="password"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  {errors.password && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required - minimum length of 8
                    </span>
                  )}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    ref={register({ required: true })}
                  ></Form.Control>
                  {errors.address && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter a second address (optional)"
                    name="address2"
                    ref={register}
                  ></Form.Control>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={6} md={12} className="mb-4">
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    name="country"
                    ref={register({ required: true, validate: isCountry })}
                  >
                    <option>Country...</option>
                    <option>United States</option>
                  </select>
                  {errors.country && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Col>
                <Col lg={6} md={12} className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="Enter zip code"
                    name="zipcode"
                    ref={register({ required: true })}
                  />
                  {errors.zipcode && (
                    <span className="invalid-feedback d-block ml-2">
                      This field is required
                    </span>
                  )}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12}>
                  <input type="hidden" name="type" value="2" ref={register} />
                  <Form.Check
                    type="checkbox"
                    label="I accept the terms and conditions"
                    name="terms"
                    ref={register({ required: true })}
                  />
                  {errors.terms && (
                    <span className="invalid-feedback d-block ml-2">
                      You must agree to the terms and conditions
                    </span>
                  )}
                </Col>
                <Col lg={12}>
                  <Form.Check
                    type="checkbox"
                    label="Add me to the newsletter"
                    name="newsLetter"
                    ref={register}
                  />
                </Col>
              </Form.Row>
              <div>
                <Button variant="dark" type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      ) : (
        <Thanks />
      )}
    </Container>
  );
}

export default Signup;
