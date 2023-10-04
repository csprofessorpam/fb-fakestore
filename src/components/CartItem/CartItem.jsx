import React, {useContext} from 'react'
import { CartContext } from '../../contexts/CartContext'
import './CartItem.css'
//FiTrash2
import { FiTrash2 } from "react-icons/fi";

function CartItem({product}) {

      //use global state
  //NOTE {} not []
  const {cart, removeProduct, updateQty} = useContext(CartContext)

  return (
    <div className="cart-item">
        <img src={product.image} />
        <h3>{product.title}</h3>
        <h3>{product.price.toFixed(2)}</h3>
        
        {
          product.quantity > 1?
        <p className="cart-btn" onClick={()=>updateQty(product, -1)}>-</p>
        :   
        <p onClick={()=>updateQty(product, -1)}>&nbsp;</p>
        }
        
        
        <h4>{product.quantity}</h4>
        <p className="cart-btn" onClick={()=>updateQty(product, 1)}>+</p>
        <FiTrash2 className="trash-icon" onClick={()=>removeProduct(product.id)} />
    </div>
  )
}

export default CartItem