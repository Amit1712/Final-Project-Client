import React, { useState, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { StoreContext } from "./StoreContext";
library.add(fas);

function CartItem({ product, onRemove }) {
  const [store, updateStore] = useContext(StoreContext);
  const [quantity, setQuantity] = useState(1);

  function handleCounterClick(event) {
    const { name } = event.target;
    if (name === "plus") {
      setQuantity(quantity + 1);
      updateStore({
        ...store,
        cart: {
          ...store.cart,
          itemsCount: store.cart.itemsCount + 1,
          totalPrice: store.cart.totalPrice + product.price,
        },
      });
    } else if (name === "minus") {
      if (quantity <= 1) {
        onRemove(product, quantity);
      } else {
        setQuantity(quantity - 1);
        updateStore({
          ...store,
          cart: {
            ...store.cart,
            itemsCount: store.cart.itemsCount - 1,
            totalPrice: store.cart.totalPrice - product.price,
          },
        });
      }
    }
  }

  return (
    <Row className="p-3">
      <Col lg={3} md={5} xl={3}>
        <div className="rounded mb-3 mb-md-0">
          <a href={`/product/${product._id}`}>
            <img alt="blabla" className="img-fluid w-100" src={product.img} />
          </a>
        </div>
      </Col>
      <Col lg={9} xl={9} md={7}>
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h5>{product.name}</h5>
              <p className="mb-2 text-muted text-uppercase small">
                Material: {product.material.join(", ")}
              </p>
              <p className="mb-3 text-muted text-uppercase small">Size: 32cm</p>
            </div>
            <div>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="light"
                  onClick={handleCounterClick}
                  name="minus"
                >
                  -
                </Button>
                <input
                  name="quantity"
                  value={quantity}
                  readOnly
                  type="number"
                  style={{ width: "30%" }}
                />
                <Button
                  variant="light"
                  onClick={handleCounterClick}
                  name="plus"
                >
                  +
                </Button>
              </div>
              <small className="form-text text-muted text-center">
                (Note, 1 piece)
              </small>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <a
                href="#!"
                type="button"
                className="card-link-secondary small text-uppercase mr-3"
                onClick={() => {
                  handleCounterClick({ target: { name: "minus" } });
                }}
              >
                <FontAwesomeIcon icon={["fas", "trash"]} className="mr-1" />
                Remove item
              </a>
              <a
                href="#!"
                type="button"
                className="card-link-secondary small text-uppercase"
              >
                <FontAwesomeIcon icon={["fas", "heart"]} className="mr-1" />
                Move to wish list
              </a>
            </div>
            <p className="mb-0">
              <span>
                <strong>${product.price}</strong>
              </span>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CartItem;
