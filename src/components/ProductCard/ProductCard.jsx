import React, {useContext} from 'react'
import './ProductCard.css'
import { FaEuroSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
//FaEuroSign
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CartContext } from '../../contexts/CartContext';

function ProductCard({product}) {

  //use global state
  //NOTE {} not []
  const {cart, addProduct, removeProduct} = useContext(CartContext)
  const [inCart, setInCart] = React.useState(false)

  //has this product been added already?

  React.useEffect(
    ()=>{
      //is this card in favorites?
      setInCart(cart?.find(item=>item.id===product.id))
      console.log(inCart)
    }, [cart]
  )

  return (
    <div className="product-card">
      {/* {
        inCart?
        <FaHeart onClick={()=>removeProduct(product.id)}className="heart-blue" />
        :
        <FaRegHeart  
        onClick={()=>addProduct(product)} />
      } */}
      <Link to={`/details/${product?.id}`} className="product-card">
        <img src={product?.image} />
        </Link>
        <h5>{product?.title}</h5>
        <p>{product?.category}</p>
        <div className="prod-price">
        <FaEuroSign />
        <p>{product?.price}</p>
        </div>
    </div>
  )
}

export default ProductCard