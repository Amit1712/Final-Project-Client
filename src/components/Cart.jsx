import { useContext, useEffect } from "react";
import { StoreContext, saveToStorage } from "./StoreContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

function Cart() {
  const [store, updateStore] = useContext(StoreContext);
  const withVat = store.cart.totalPrice + store.cart.totalPrice * 0.17;
  useEffect(() => {
    saveToStorage(store.cart.cartItems);
  }, [store]);

  const isEmpty = () => {
    if (store.cart.itemsCount === 0) {
      alert("Please place items in the cart before heading to checkout");
    } else {
      window.location.href = "/checkout";
    }
  };
  const removeFromCart = (product, quantity) => {
    updateStore({
      ...store,
      cart: {
        ...store.cart,
        itemsCount: store.cart.itemsCount - quantity,
        totalPrice: store.cart.totalPrice - product.price * quantity,
        cartItems: store.cart.cartItems.filter((p) => {
          return p._id.toString() !== product._id.toString();
        }),
      },
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body id="itemsList">
              <h5 className="mb-4" id="cartHead">
                Cart (<span id="cartAmount">{store.cart.itemsCount}</span>{" "}
                items)
              </h5>

              {/*Item row starts here */}
              {store.cart.cartItems.length > 0 ? (
                store.cart.cartItems.map((el, idx) => {
                  return (
                    <CartItem
                      product={el}
                      key={el._id}
                      onRemove={removeFromCart}
                    />
                  );
                })
              ) : (
                <p className="p-2">Your cart is empty</p>
              )}
              {/*Item row ends here */}
              <hr />
              <p className="text-primary mb-0">
                <FontAwesomeIcon
                  icon={["fas", "info-circle"]}
                  className="mr-1"
                />
                Do not delay the purchase, adding items to your cart does not
                mean booking them.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-4">Expected shipping delivery</h5>

              <p className="mb-0">Thu., 12.03 - Mon., 16.03</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-3">Total Items</h5>
              <span>
                <strong>{store.cart.itemsCount}</strong>
              </span>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary amount
                  <span id="priceBeforeVAT">{store.cart.totalPrice}$</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Free!</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong id="priceFinal">{withVat}$</strong>
                  </span>
                </li>
              </ul>

              <Button
                variant="dark"
                className="btn-block btn-a"
                onClick={isEmpty}
              >
                Go to checkout
              </Button>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <h5 className="mb-4">We accept</h5>
              <img
                className="mr-2"
                width="45px"
                src="https://banner2.cleanpng.com/20180324/qbe/kisspng-paypal-logo-computer-icons-payment-system-paypal-5ab70479760fa6.0404110315219436734836.jpg"
                alt="PayPal"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
