import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "./OrdersTable";

function Profile() {
  return (
    <Container fluid>
      <Row className="p-3">
        <h1 className="m-auto">User Name Profile</h1>
      </Row>
      <Row className="mb-2">
        <Col lg={3}>
          <div className="p-3" id="profilePic">
            <img
              src="https://via.placeholder.com/300"
              id="userImg"
              alt="profile-pic"
            />
          </div>
        </Col>
        <Col lg={9}>
          <form className="form">
            <div className="mb-1 p-2">
              <input type="text" disabled defaultValue="user first name" />
            </div>
            <div className="mb-1 p-2">
              <input type="text" disabled defaultValue="user last name" />
            </div>
            <div className="mb-1 p-2">
              <input type="text" disabled defaultValue="user email" />
            </div>
            <div className="mb-1 p-2">
              <input type="text" disabled defaultValue="user address" />
            </div>
            <div className="mb-1 p-2">
              <input type="text" disabled defaultValue="user new password" />
            </div>
          </form>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Table />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
