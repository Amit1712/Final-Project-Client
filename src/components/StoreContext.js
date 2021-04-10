import { useState, createContext } from "react";

const storage = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  token: sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : "",
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {},
  isLoggedIn: sessionStorage.getItem("isLoggedIn")
    ? JSON.parse(sessionStorage.getItem("isLoggedIn"))
    : false,
};

const storeObj = {
  isLoggedIn: storage.isLoggedIn,
  token: storage.token,
  user: {
    ...storage.user,
  },
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

export const saveUserDetails = (user, token, isLoggedIn) => {
  sessionStorage.setItem("token", JSON.stringify(token !== "" ? token : ""));
  sessionStorage.setItem("user", JSON.stringify(user !== {} ? user : {}));
  sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
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
