import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { selectCartCount } from '../../store/cart/cart.selector.js';


const CartIcon = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen);

    const cartCount = useSelector(selectCartCount);
    return (
        <CartIconContainer onClick={() => dispatch(setIsCartOpen(!isCartOpen))} >
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
