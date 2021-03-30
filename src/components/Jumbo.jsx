import React from "react";
import { Jumbotron, Col } from "react-bootstrap";

function Jumbo() {
  return (
    <Col lg={12}>
      <Jumbotron fluid className="mb-auto jumbo">
        <h1>Diamondz Jewelry Store</h1>
        <p>
          Welcome to Diamondz where all our jewels come from South-Africa, we
          use 100% AUTHENTIC blood diamonds.
        </p>
        <p>
          Please register if you haven't already or use the login to enter our
          customers club for special offers, monthly sales and our weekly
          newsletter!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Jumbotron>
    </Col>
  );
}

export default Jumbo;
