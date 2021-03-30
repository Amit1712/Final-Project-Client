import { useContext } from "react";
import { StoreContext, saveToStorage } from "./StoreContext";
import { Card, Button } from "react-bootstrap";
//FA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart);

function ProductThumbnail({ product }) {
  const [store, updateStore] = useContext(StoreContext);
  const onAddToCart = () => {
    updateStore({
      ...store,
      cart: {
        ...store.cart,
        itemsCount: store.cart.itemsCount + 1,
        totalPrice: store.cart.totalPrice + product.price,
      },
    });
    store.cart.cartItems.push(product);
  };

  return (
    <Card className="w-100 d-lg-block" key={product._id}>
      <a href={`/product/${product._id}`}>
        <Card.Img alt="product-img" src={product.img} variant="top" />
      </a>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <span>{product.desc}</span>
        </Card.Text>
        <Card.Text>
          <span>{product.price}$</span>
        </Card.Text>
        <div>
          <span>⭐⭐⭐⭐⭐</span>

          <Button
            className="ml-4"
            variant="dark"
            onClick={() => {
              onAddToCart();
              saveToStorage(store.cart.cartItems);
            }}
          >
            Add To <FontAwesomeIcon icon="shopping-cart" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductThumbnail;
