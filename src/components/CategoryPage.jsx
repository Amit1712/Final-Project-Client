import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import ItemsList from "./List";
import {
  Container,
  Row,
  Col,
  Form,
  Carousel,
  Button,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

function Sidebar(props) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [toolTip, setTooltip] = useState("");
  const targetFilter = useRef(null);
  const targetSort = useRef(null);

  const showFilterTooltip = () => {
    setShowFilter(true);
    setTimeout(() => {
      setShowFilter(false);
    }, 1000);
  };
  const showSortTooltip = () => {
    setShowSort(true);
    setTimeout(() => {
      setShowSort(false);
    }, 1000);
  };

  return (
    <Form
      className={`pt-5 p-4 pb-5 sidebar-menu${
        props.isMenuOpen === true ? " open" : ""
      }`}
    >
      <Form.Group>
        <Button
          size="sm"
          variant="outline-dark"
          className="float-right"
          onClick={props.onMenuToggle}
          ref={targetFilter}
        >
          Hide Filter Menu
        </Button>
        <h5>Filter Options</h5>
      </Form.Group>
      <Form.Group>
        {[
          "Diamond",
          "Gold",
          "Silver",
          "Bronze",
          "White-Gold",
          "Platinum",
          "Titanium",
          "Copper",
          "Gemstone",
        ].map((mat, idx) => {
          return (
            <Form.Row key={idx} className="p-1">
              <Form.Check
                className="mb-2"
                id={mat}
                value={mat}
                onChange={(e) => {
                  props.handleChange(e);
                  e.target.checked
                    ? setTooltip("Added")
                    : setTooltip("Removed");
                  showFilterTooltip();
                }}
              />
              <Form.Label htmlFor={mat}>{mat}</Form.Label>
              <Overlay
                target={targetFilter.current}
                show={showFilter}
                placement="bottom"
              >
                <Tooltip id="filterTooltip">{toolTip} filter!</Tooltip>
              </Overlay>
            </Form.Row>
          );
        })}
      </Form.Group>
      {props.whoChecked.length > 0 && (
        <Button
          size="sm"
          variant="outline-dark"
          className="float-right mb-2"
          onClick={() => {
            props.clearFilters();
            setTooltip("Cleared");
            showFilterTooltip();
          }}
        >
          Clear all Filters
        </Button>
      )}
      <Form.Label>Sort Products</Form.Label>
      <Form.Control
        ref={targetSort}
        as="select"
        custom
        onChange={(e) => {
          props.handleSort(e);
          showSortTooltip();
        }}
      >
        <option value="">Filter By...</option>
        <option value="-">Price: Low to Highest</option>
        <option value="+">Price: High to Lowest</option>
      </Form.Control>
      <Overlay
        target={targetSort.current}
        show={showSort}
        placement="bottom-start"
      >
        <Tooltip id="sortTooltip">Sorted!</Tooltip>
      </Overlay>
    </Form>
  );
}

function CategoryPage() {
  let { id } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [whoChecked, setWhoChecked] = useState([]);
  const [isMenuOpen, toggleMenu] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const getData = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/cat/${id}`
    );
    setCategory(data);
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/cid/${id}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSort = (event) => {
    const { value } = event.target;
    const sortedProducts = products.sort((a, b) =>
      value === "-" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
    forceUpdate();
  };
  const clearFilters = () => {
    const arr = Array.from(document.querySelectorAll("input[type=checkbox]"));
    arr.forEach((el) => (el.checked = false));
    getData();
    setWhoChecked([]);
  };

  const handleChange = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/${id}/${value}`
      );
      if (whoChecked.length === 0) {
        setProducts(data);
      } else {
        setProducts((prevData) => {
          return [...prevData, ...data];
        });
      }
      setWhoChecked((prevVal) => {
        return [...prevVal, value];
      });
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/cid/${id}`
      );
      if (!whoChecked.includes(value)) {
        setProducts(res.data);
      } else {
        if (whoChecked.length <= 1) {
          setProducts(res.data);
        } else {
          setProducts(products.filter((p) => !p.material.includes(value)));
        }
      }
      setWhoChecked(whoChecked.filter((p) => p !== value));
    }
  };

  return (
    <Container fluid>
      <Sidebar
        handleChange={handleChange}
        handleSort={handleSort}
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
        clearFilters={clearFilters}
        whoChecked={whoChecked}
      />
      <Row className="p-4">
        <h2 className="m-auto">{category.name}</h2>
      </Row>
      <Row className="p-3">
        <Button
          className="m-auto"
          variant="dark"
          onClick={() => {
            toggleMenu((isOpen) => !isOpen);
          }}
        >
          Show Filter Menu
        </Button>
      </Row>
      <Row>
        <Col lg={10} className="m-auto">
          <Carousel className="">
            <Carousel.Item className="carouselImg" interval={2000}>
              <img
                className="d-block w-100"
                src={category.src}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item className="carouselImg" interval={2000}>
              <img
                className="d-block w-100"
                src={category.src}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item className="carouselImg" interval={2000}>
              <img
                className="d-block w-100"
                src={category.src}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="p-3">
          {products.length !== 0 ? (
            <ItemsList products={products} />
          ) : (
            <p className="text-center p-4">Sorry, no products to show...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryPage;
