import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './ProductDetail.css'
import { CartContext } from '../../contexts/CartContext'
import {Link} from 'react-router-dom'

function ProductDetail() {
      //use global state
  //NOTE {} not []
  const {cart, addProduct, removeProduct} = useContext(CartContext)

    const {prodId} = useParams();

    const [product, setProduct] = React.useState('')
    const [inCart, setInCart] = React.useState(false)

    //https://fakestoreapi.com/products/1

    React.useEffect(
      ()=>{
        //get data for this product when page loads
        axios.get(`https://fakestoreapi.com/products/${prodId}`)
        .then(res =>{
          console.log(res.data)
          setProduct(res.data)
        })
        .catch(err => console.log(err))


      }, []
    )

    //check if in cart
    React.useEffect(
      ()=>{

        // let found = cart.find(item => item.id ==prodId)
        // console.log(found)
        // setInCart(found)

      }, [cart]
    )

  return (
    <div className="details-container">
      <Link to="/">Continue shopping</Link>
      <div className="product-details"> 
        <img src={product?.image} />
        <div className="details-info">
            <h3>{product?.title}</h3>
            <h3>{product?.price}</h3>
            <h3>Description</h3>
            <p>{product?.description}</p>
            {
              inCart?
            <button onClick={()=>removeProduct(product.id)}>Remove from Cart</button>
            :
            <button onClick={()=>addProduct(product)}>Add to Cart</button>
            
            }
        </div>
      </div>
    </div>
  )
}

export default ProductDetail