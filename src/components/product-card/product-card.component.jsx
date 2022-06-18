import './products-card.styles.scss'
import Button from '../button/button.component'

const ProductCard = (props) => {
    const { name, price, imageUrl } = props;
    console.log(props);
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>
                    {name}
                </span>
                <span className='price'>
                    {price}
                </span>
            </div>
            <Button buttonType="inverted">Add to card</Button>
        </div>
    )
}

export default ProductCard