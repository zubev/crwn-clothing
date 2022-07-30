import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount } from '../../store/cart/cart.selector';


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
