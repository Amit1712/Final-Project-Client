import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form } from "react-bootstrap";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onLogin = (data) => {
    console.log("user logged in");
    console.log(data);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={12} className="p-5">
          <div className="w-fitC m-auto pb-5">
            <h1 className="m-auto p-2">Login to our exclusive club!</h1>
          </div>
          <form
            className="form"
            id="loginForm"
            onSubmit={handleSubmit(onLogin)}
          >
            <div>
              <h2>Hello User</h2>
            </div>
            <div className="p-3">
              <div className="m-1">
                <Form.Control
                  type="text"
                  name="email"
                  ref={register({ required: true })}
                  placeholder="Email:"
                  className="d-flex p-1 m-2"
                />
                {errors.email && (
                  <span className="invalid-feedback d-flex p-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="m-1">
                <Form.Control
                  type="password"
                  name="password"
                  ref={register({ required: true, minLength: 8 })}
                  placeholder="Password:"
                  className="d-flex p-1 m-2"
                />
                {errors.password && (
                  <span className="invalid-feedback d-flex p-1">
                    This field is required - minimum 8 characters
                  </span>
                )}
              </div>
              <div className="pl-3-5">
                <small>
                  <a href="/">I forgot my password</a>
                </small>
              </div>
            </div>
            <div className="p-3">
              <Button variant="dark" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
