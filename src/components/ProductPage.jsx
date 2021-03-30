import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductThumb from "./ProductThumbnail";
import { StoreContext, saveToStorage } from "./StoreContext";
import axios from "axios";

library.add(fab);

function ItemsCarousel(props) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      autoPlay={true}
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={2000}
      keyBoardControl={false}
      centerMode={true}
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {props.products.map((prod) => {
        return <ProductThumb product={prod} />;
      })}
    </Carousel>
  );
}

function ProductPage() {
  let { id } = useParams();
  const [prod, setProd] = useState({});
  const [products, setProducts] = useState([]);
  const [store, updateStore] = useContext(StoreContext);

  const onAddToCart = (id) => {
    updateStore({
      ...store,
      cart: {
        ...store.cart,
        itemsCount: store.cart.itemsCount + 1,
        totalPrice: store.cart.totalPrice + prod.price,
      },
    });
    store.cart.cartItems.push(prod);
    saveToStorage(store.cart.cartItems);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/${id}`
      );
      setProd(data);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/cid/${data.catID}`
      );
      setProducts(res.data);
    };
    getData();
  }, []);

  return (
    <Container fluid>
      <Row className="p-3">
        <Col lg={6}>
          <div className="form productImg">
            <img src={prod.img} alt="prodimage" id="prodImgBig" />
            <div className="thumbs">
              <div className="d-inline-block w-30">
                <img src={prod.img} alt="product" />
              </div>
              <div className="d-inline-block w-30">
                <img src={prod.img} alt="product" />
              </div>
              <div className="d-inline-block w-30">
                <img src={prod.img} alt="product" />
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <Form className="form" id="productListing">
            <h2>{prod.name}</h2>
            <h5>{prod.desc}</h5>
            <h5>${prod.price}</h5>
            <Form.Label className="d-block">Choose quantity</Form.Label>
            <Form.Control as="select" custom>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            <Form.Label className="d-block">Choose size</Form.Label>
            <Form.Control as="select" custom>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </Form.Control>
            <div>
              <small>Shipping Fee:</small> <small>None!</small>
            </div>
            <div className="prodBtns">
              <Button variant="dark">Buy Now</Button>
              <Button
                variant="dark"
                onClick={() => {
                  onAddToCart(prod);
                }}
              >
                Add To Cart
              </Button>
            </div>
            <div className="pay-icons">
              <div>
                <small className="text-muted d-block">We accept</small>
                <FontAwesomeIcon icon={["fab", "cc-paypal"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "cc-visa"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "cc-mastercard"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "cc-amex"]} size="2x" />
                <FontAwesomeIcon icon={["fab", "bitcoin"]} size="2x" />
              </div>
            </div>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row className="p-3">
        <Col lg={12}>
          <h4>Related Items</h4>
          <ItemsCarousel products={products} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
