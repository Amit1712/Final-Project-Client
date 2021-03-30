import React from "react";
import { Carousel, Col } from "react-bootstrap";

function Display() {
  return (
    <Col lg={10} className="m-auto">
      <Carousel className="salesCarousel">
        <Carousel.Item className="carouselImg" interval={2000}>
          <img
            className="d-block w-100"
            src="https://themes.zone/wp-content/uploads/2018/11/diamond-city-demo-image-2.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="carouselImg" interval={2000}>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0323/6057/files/SMALL_BEADED_BANNER3_1200x.jpg?v=1591205012"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="carouselImg" interval={2000}>
          <img
            className="d-block w-100"
            src="http://manikchandjewellers.com/example/slider2.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Col>
  );
}

export default Display;
