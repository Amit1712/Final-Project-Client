import { useState, useEffect } from "react";
import { Card, CardDeck, Col } from "react-bootstrap";
import axios from "axios";

function createCatCard(category) {
  return (
    <Card className="text-black catCard" key={category._id}>
      <a href={`cat/${category._id}`}>
        <Card.Img src={category.src} alt={`${category.name}`} />
        <Card.ImgOverlay>
          <Card.Title>{category.name}</Card.Title>
        </Card.ImgOverlay>
      </a>
    </Card>
  );
}

function Men(props) {
  return (
    <CardDeck className="h-100">{props.items.map(createCatCard)}</CardDeck>
  );
}

function Women(props) {
  return (
    <CardDeck className="h-100">{props.items.map(createCatCard)}</CardDeck>
  );
}

function CategoryThumbs() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(process.env.REACT_APP_BASE_URL);
      setCategories(data);
    };
    getData();
  }, []);

  const men = [],
    women = [];
  const [categories, setCategories] = useState([]);
  categories.forEach((cat) => {
    cat.gen === "M" ? men.push(cat) : women.push(cat);
  });

  return (
    <CardDeck>
      <Col lg={12} className="p-3">
        <Women items={women} />
      </Col>
      <Col lg={12} className="p-3">
        <Men items={men} />
      </Col>
    </CardDeck>
  );
}

export default CategoryThumbs;
