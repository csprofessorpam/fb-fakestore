import React, {useContext} from 'react'

import {auth, db} from '../../config/firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, where} from 'firebase/firestore'
import './Auth.css'
import axios from 'axios'
import { CartContext } from '../../contexts/CartContext'


function Auth() {

    const {cart, setCart} = useContext(CartContext)

    let navigate = useNavigate();

    //create state to track if existing user
    const [existingUser, setExistingUser] = React.useState(false)
    //create state for form data
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")

    //create functions for signup and login
    const handleSignup = (e) =>{
        //alert('signup');
        e.preventDefault();
        console.log('signup');
        //connect to fb uth
        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.log(res.user)
            //add username as display name
            updateProfile(auth.currentUser, {displayName: name})
            navigate('/')
        })
        .catch(err =>{
            alert(err.code)
        })

    }

    const handleLogin = (e) =>{
        e.preventDefault();
        //login
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            //need to check for items saved in cart in fb
            getSavedItems()

            navigate('/')
        })
        .catch(err =>{
            console.log('login error', err)
            //alert(err.com)
        })


    }

    const getSavedItems = async () =>{
        //get reference to collection
        const itemsRef = collection(db, 'cartitems')
        //set up query to just get for this user
        console.log('userid is ', auth.currentUser.uid)
        //set up query for this user
        const q = query(itemsRef, where("userId", '==', auth.currentUser.uid))
        try{
            //get matching documents
            const querySnapshot = await getDocs(q, itemsRef)
        
            console.log('data returned')
            //console.log(res)
            const items = querySnapshot.docs.map( item =>(
                { _id:item.id,
                  ...item.data()
                }
            ))
            console.log('db items', items)
            //This needs to be put in cart!
            setCart(items)
            //only retrieve productIds
            // const item_ids = querySnapshot.docs.map( item =>item.get('productId')
            // )
            // console.log(item_ids)
            

            /*
            const item_ids = items.map(item => item.productId)
            const item_urls = item_ids.map(item => `https://fakestoreapi.com/products/${item}`)
            // https://fakestoreapi.com/products/1
            //console.log(item_urls)
            //yay!  now need to make api calls for each one
            
            let products = await Promise.all(
                item_urls.map(url => {
                    return axios.get(url).then(res => res.data)
                })
            )
            // console.log('product data', products)
            //but it needs the quantity!
            for (let i = 0; i < products.length; i++){
                products[i] = {...products[i], quantity: items[i].quantity}
            }
            console.log('product data', products)
            //This needs to be put in cart!
            setCart(products)
            */

            }
            catch(err){
                console.log(err)
            }
            
        
    }

  return (
    <div className="auth-container">

        {
            existingUser?
            <form className="auth-form" onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        required
                    />
                </div>
                <button  className='reg-btn' >Login</button>
                <p>Don't have an account? <span className="form-link" onClick={()=>setExistingUser(false)}>Signup</span></p>
            </form>
            :
            <form className="auth-form" onSubmit={handleSignup}>
                
                <h1>Signup with your email</h1>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => {setName(e.target.value)}}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        required
                    />
                    
                </div>

                
                <button className='reg-btn'>Register</button>
                <p>Already have an account? <span className="form-link" onClick={()=>setExistingUser(true)}>Login</span></p>
            </form>
        }


    </div>
  )
}

export default Auth