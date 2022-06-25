import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartPrice: 0,
}


const cartReducer = (state, action) => {
  const { type, payload } = action
  console.log('dispached');
  console.log(action);

  switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
          return {
              ...state,
              ...payload
          }
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload
        }
      default:
          throw new Error(`Unhendled type ${type} in userReducer`)
  }
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

  const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
  const { cartCount, cartPrice, cartItems, isCartOpen } = state

  const updateCartItemsReducer = (newCartItems) => {
    const newCartPrice = newCartItems.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity * currentValue.price;
    }, 0);
    const newCartCount = newCartItems.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartPrice: newCartPrice
    }))
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems)
  };
  const removeItemToCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems)

  };
  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems)

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
