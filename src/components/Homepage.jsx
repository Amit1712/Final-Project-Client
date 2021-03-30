import React from "react";
import { Container, Row } from "react-bootstrap";
import Display from "./Display";
import Jumbo from "./Jumbo";
import Categories from "./Categories";

function Homepage() {
  return (
    <Container fluid>
      <Row>
        <Jumbo />
      </Row>
      <Row>
        <Display />
      </Row>
      <Row>
        <Categories />
      </Row>
    </Container>
  );
}

export default Homepage;
