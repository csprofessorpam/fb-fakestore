import React, {useContext} from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
//AiOutlineShoppingCart
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import './Header.css'


function Header() {

  //get user data
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  //use global state
  //NOTE {} not []
  const {cart, addProduct, removeProduct, setCart} = useContext(CartContext)

  const signout = () =>{
    signOut(auth)
    //clear cart
    setCart([])
    navigate('/')

  }

  return (
    <div className="header-container">
        <Link to="/"><h2>Pam's Fake Store</h2></Link>
      {
        user?
        <div>
                <span className="username">
              {user.displayName?user.displayName : user.email}
              </span>
            <button className="auth-link" onClick={signout}>Logout</button>
          </div>
            :
        <Link className="auth-link" to="/auth">Signup</Link>
      }

        <Link to='/checkout' className="cart-wrapper">
          <AiOutlineShoppingCart className="cart-icon"/>
          <p className="cart-num">{cart.length}</p>
        </Link>
    </div>
  )
}

export default Header