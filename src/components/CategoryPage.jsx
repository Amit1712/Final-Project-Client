import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ItemsList from "./List";
import { Container, Row, Col, Form, Carousel } from "react-bootstrap";
import axios from "axios";

function CategoryPage() {
  let { id } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [whoChecked, setWhoChecked] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
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
    getData();
  }, []);

  const handleSort = (event) => {
    const { value } = event.target;
    debugger;
    const sortedProducts = products.sort((a, b) =>
      value === "-" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
    forceUpdate();
  };

  const handleChange = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/${id}/${value}`
      );
      if (data.length <= 0) {
        //when specific material does not have any products related to it
        //fix client side when this occurs
        console.log("sorry got nothing");
      }
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
      <Row className="p-4">
        <h2 className="m-auto">{category.name}</h2>
      </Row>
      <Row>
        <Col sm={4}>
          <Form className="form">
            <Form.Label>Filter Options</Form.Label>
            <Form.Group className="mb-auto">
              <Form.Label htmlFor="priceRange">
                Price Range (19.99$ - 99999.99$)
              </Form.Label>
              <Form.Control type="range" id="priceRange" />
              <Form.Check
                label="Diamond"
                className="mb-2"
                value="Diamond"
                onChange={handleChange}
              />
              <Form.Check
                label="Gold"
                className="mb-2"
                value="Gold"
                onChange={handleChange}
              />
              <Form.Check
                label="Silver"
                className="mb-2"
                value="Silver"
                onChange={handleChange}
              />
              <Form.Check
                label="Bronze"
                className="mb-2"
                value="Bronze"
                onChange={handleChange}
              />
              <Form.Check
                label="White Gold"
                className="mb-2"
                value="White-Gold"
                onChange={handleChange}
              />
              <Form.Check
                label="Platinum"
                className="mb-2"
                value="Platinum"
                onChange={handleChange}
              />
              <Form.Check
                label="Titanium"
                className="mb-2"
                value="Titanium"
                onChange={handleChange}
              />
              <Form.Check
                label="Copper"
                className="mb-2"
                value="Copper"
                onChange={handleChange}
              />
              <Form.Check
                label="Gemstones"
                className="mb-2"
                value="Gemstone"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <Form className="form">
            <Form.Group className="mb-auto">
              <Form.Label>Shipping Methods</Form.Label>
              <Form.Check type="radio" label="Express" className="mb-2" />
              <Form.Check type="radio" label="UPS" className="mb-2" />
              <Form.Check type="radio" label="DHL" className="mb-2" />
              <Form.Check type="radio" label="Regular" className="mb-2" />
              <Form.Check type="radio" label="Free" className="mb-2" />
            </Form.Group>
          </Form>
          <div className="form filoptions">
            <Form.Label>Sort Products</Form.Label>
            <Form.Control as="select" custom onChange={handleSort}>
              <option value="">Filter By...</option>
              <option value="-">Price: Low to Highest</option>
              <option value="+">Price: High to Lowest</option>
            </Form.Control>
          </div>
        </Col>
        <Col lg={8}>
          <Carousel className="salesCarousel pTop">
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
