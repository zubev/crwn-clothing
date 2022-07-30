import { FC } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';


import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './products-card.styles';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/categories.types';


type ProductCardProps = {
  product: CategoryItem;

};


const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  console.log(product);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch()
  const addItemToCartHandler = () => {
    dispatch(addItemToCart(cartItems, product))
  }

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addItemToCartHandler}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;