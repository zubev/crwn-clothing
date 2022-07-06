import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


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

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
