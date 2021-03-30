import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Items from "./List";
import axios from "axios";

function SearchResults() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/${keyword}`
      );
      setProducts(data);
    };
    getData();
  }, []);

  return (
    <Container fluid>
      <Row className="p-3">
        <h2 className="mb-2">Search Results:</h2>
      </Row>
      <Row className="p-3 l-border">
        {products.length !== 0 ? (
          <Items products={products} />
        ) : (
          <p className="p-4 mb-L">Sorry, no products to show...</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;
