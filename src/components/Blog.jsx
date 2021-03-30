import { useState } from "react";
import { Container, Row, Col, Card, Button, CardDeck } from "react-bootstrap";
import axios from "axios";

function Blog() {
  const [articles, setArticles] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog`);
    setArticles(data);
  };
  window.onload = getData;
  function createArticleCard(post) {
    return (
      <Col lg={4} key={post._id}>
        <Card className="m-2 p-1">
          <Row className="no-gutters">
            <Col>
              <Card.Img variant="top" src={post.src} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.substring(0, 61)}...</Card.Text>
                <Button
                  variant="dark"
                  href={`blog/post/${post._id}`}
                  style={{ color: "white" }}
                >
                  Read More
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row className="p-2">
        <h1 className="m-auto p-4">Our blog</h1>
      </Row>
      <Row>
        <CardDeck className="p-3"> {articles.map(createArticleCard)}</CardDeck>
      </Row>
    </Container>
  );
}

export default Blog;
