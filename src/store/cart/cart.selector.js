import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCart],
  (cart) => cart.isCartOpen
);

export const selectCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.price;
  }, 0)
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0)
);
