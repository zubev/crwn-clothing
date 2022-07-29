import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-drop-down.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports.js";
import { selectCartItems } from "../../store/cart/cart.selector.ts";

const CartDropdown = () => {
  const navigate = useNavigate();
  const cartItems  = useSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cart) => <CartItem item={cart} key={cart.id} />)

        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
