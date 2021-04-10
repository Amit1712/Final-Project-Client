import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form } from "react-bootstrap";
import { StoreContext, saveUserDetails } from "./StoreContext";
import axios from "axios";

function Thanks() {
  return (
    <>
      <Row>
        <h2 className="p-5 m-auto mt-5">Thank you for logging in!</h2>
      </Row>
      <Row>
        <div className="p-3 m-auto text-center">
          <p>
            If you want you can check out your profile and edit your details at
            anytime!
          </p>
          <Button variant="dark" href="/profile">
            My Profile
          </Button>
        </div>
      </Row>
      <Row className="mb-L">
        <div className="p-3 text-center m-auto">
          <p>
            You can also browse our site and products freely and shop your
            favorite jewlerys!
          </p>
          <Button variant="dark" href="/">
            Go Shopping!
          </Button>
        </div>
      </Row>
    </>
  );
}

function Login() {
  const [isError, setIsError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [store, updateStore] = useContext(StoreContext);
  const { register, handleSubmit, errors } = useForm();
  const onLogin = async (userData) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        userData
      );
      const loggedUser = { ...data.user, password: "" };
      updateStore({
        ...store,
        token: data.token,
        user: { ...loggedUser },
        isLoggedIn: true,
      });
      setIsLogged(true);
      saveUserDetails(loggedUser, data.token, true);
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <Container fluid>
      {isLogged ? (
        <Thanks />
      ) : (
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
              {isError && (
                <div>
                  <span className="invalid-feedback d-block m-auto">
                    Email or password is wrong!
                  </span>
                </div>
              )}
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
      )}
    </Container>
  );
}

export default Login;
