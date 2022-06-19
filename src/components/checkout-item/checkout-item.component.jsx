import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

  const clearButtonClickHandler = () => clearItemFromCart(cartItem);
  const addItemClickHandler = () => addItemToCart(cartItem);
  const removeItemToCartClickHandler = () => removeItemToCart(cartItem);



  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={removeItemToCartClickHandler} className="arrow">&#10094;</div>
        <span className="value">{quantity}</span>
        <div onClick={addItemClickHandler} className="arrow">&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div onClick={clearButtonClickHandler} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
