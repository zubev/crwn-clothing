import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((el) => el.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((cart) =>
      cart.id === productToAdd.id
        ? { ...cart, quantity: cart.quantity + 1 }
        : cart
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, productToClear) => {
  const existingItem = cartItems.find((el) => el.id === productToClear.id);
  if (existingItem) {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
  }
  return cartItems;
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((el) => el.id === productToRemove.id);

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return cartItems.map((cart) =>
    cart.id === productToRemove.id
      ? { ...cart, quantity: cart.quantity - 1 }
      : cart
  );
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartPrice: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartPrice = cartItems.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity * currentValue.price;
    }, 0);
    setCartPrice(newCartPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
