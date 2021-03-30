import { useState, useEffect, useContext } from "react";
import { StoreContext } from "./StoreContext";
//Bootstrap
import { Row, Navbar, Nav, NavDropdown, Button, Form } from "react-bootstrap";
//FA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo.png";
import axios from "axios";

library.add(faShoppingCart);

function Header() {
  const [store] = useContext(StoreContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(process.env.REACT_APP_BASE_URL);
      setCategories(data);
    };
    getData();
  }, []);
  const [keyword, setKeyword] = useState("");
  return (
    <Row>
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="navbar"
        >
          <Navbar.Brand href="/">
            <img src={logo} alt="brand-logo" id="brandLogo" className="mb-1" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((cat, index) => {
                  return (
                    <NavDropdown.Item href={`/cat/${cat._id}`} key={index}>
                      {cat.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Form inline>
                <Form.Control
                  id="searchBox"
                  value={keyword}
                  size="sm"
                  type="text"
                  placeholder="Search"
                  className="mr-sm-1"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
                <Button
                  size="sm"
                  variant="outline-light"
                  href={`/search/${keyword}`}
                >
                  Search
                </Button>
              </Form>
            </Nav>
            <Nav>
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/cart">
                <FontAwesomeIcon icon="shopping-cart" />
                {store.cart.itemsCount > 0 && (
                  <span className="ml-1">({store.cart.itemsCount})</span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </Row>
  );
}

export default Header;
