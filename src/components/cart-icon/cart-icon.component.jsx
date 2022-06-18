import './cart-icon.styles.scss';
import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from "../../context/cart.context";


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    return (
        <div onClick={() => setIsCartOpen(!isCartOpen)} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;