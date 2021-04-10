import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function UsersTable() {
  const { register, handleSubmit, errors } = useForm();
  const [users, setUsers] = useState([]);
  const [showReset, setReset] = useState(false);
  const getData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`);
    setUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (id) => {
    const userToShow = users.filter((user) => user._id.includes(id.id));
    setUsers(userToShow);
    setReset(true);
  };

  return (
    <Col>
      <Form inline onSubmit={handleSubmit(onSubmit)}>
        <div className="m-auto p-3">
          <Form.Control
            id="user_id"
            name="id"
            type="text"
            placeholder="Enter user ID"
            className="mr-sm-1"
            ref={register({ required: true })}
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
                document.querySelector("#user_id").value = "";
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
            <th>User ID</th>
            <th>Full Name</th>
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
              <tr key={user._id}>
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
