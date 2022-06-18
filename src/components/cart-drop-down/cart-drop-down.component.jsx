import './cart-drop-down.styles.scss'
import Button from '../button/button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;