import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Store from "./StoreContext";
//Components
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./Homepage";
import AboutPage from "./AboutPage";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import Login from "./Login";
import Signup from "./Signup";
import Cart from "./Cart";
import Checkout from "./CheckoutPage";
import AdminPage from "./AdminPage";
import Profile from "./Profile";
import Search from "./SearchResults";
import ContactUs from "./Contact";
import { Container, Row } from "react-bootstrap";

function ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

function App() {
  return (
    <Container fluid>
      <Store>
        <section className="sticky-top">
          <Header />
        </section>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/about" exact component={AboutPage} />
              <Route path="/cat/:id" component={CategoryPage} />
              <Route path="/product/:id" component={ProductPage} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/blog/post/:id" component={BlogPost} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/admin" exact component={AdminPage} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/search/:keyword" exact component={Search} />
              <Route path="/contact" exact component={ContactUs} />
            </Switch>
          </ScrollToTop>
        </Router>
        <Row className="footer">
          <Footer />
        </Row>
      </Store>
    </Container>
  );
}

export default App;
