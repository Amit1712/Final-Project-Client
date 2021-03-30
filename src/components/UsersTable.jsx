import { useState, useEffect } from "react";
import { Table, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function UsersTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user`
      );
      setUsers(data);
    };
    getData();
  }, []);

  return (
    <Col>
      <Form inline>
        <div className="m-auto p-3">
          <Form.Control
            type="text"
            placeholder="Enter user ID"
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
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Address</th>
            <th>Newsletter</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user._id.substring(15)}</td>
                <td>{user.FName + " " + user.LName}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.address}</td>
                <td>{user.newsLetter ? "Yes" : "No"}</td>
                <td>{user.type}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
  );
}

export default UsersTable;
