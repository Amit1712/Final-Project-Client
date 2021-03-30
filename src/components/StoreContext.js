import { useState, createContext } from "react";

const storage = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const storeObj = {
  isLoggedIn: false,
  user: {},
  cart: {
    cartItems: storage.items,
    totalPrice: storage.items.reduce((total, prod) => total + prod.price, 0),
    itemsCount: storage.items.length,
  },
};
export const saveToStorage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const StoreContext = createContext(storeObj);

const Store = ({ children }) => {
  const [store, updateStore] = useState(storeObj);
  return (
    <StoreContext.Provider value={[store, updateStore]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
