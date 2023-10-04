import {useState, createContext, useEffect} from 'react'
import {db, auth} from '../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {collection, getDocs, addDoc, Timestamp, doc, query, where, setDoc, deleteDoc} from 'firebase/firestore'
export const CartContext = createContext();

export default function CartContextProvider(props){

    //get user data
  const [user] = useAuthState(auth);

    //create the global state
    const [cart, setCart] = useState([])

    

    const addProduct = (productToAdd) =>{
        console.log('adding', productToAdd)
        //is this product already in cart?
        const match = cart.find(item => item.id == productToAdd.id)
        console.log('match', match)
        if (!match){
            //not it cart so quantity is 1
            //add quantity field to object
            console.log('first time')
            productToAdd = {...productToAdd, quantity: 1}
            //need to add this to cart
            setCart([...cart, productToAdd])

            //also need to add document to cartitems
            //but only if a user is logged in
            if (user){
                const cartRef = collection(db, 'cartitems')
                addDoc(cartRef, {
                    userId: user.uid,
                    id: productToAdd.id,
                    image: productToAdd.image,
                    title: productToAdd.title,
                    price: productToAdd.price,
                    quantity: 1,
                    createdAt: Timestamp.now().toDate()
                })
                .then(res=>{
                    console.log("added to db?")
                })
                .catch(err => console.log(err))
            }
        }
        else{
            //update matching product
            //what is current qty
            console.log('cur qty is ', match.quantity)
            let newQty = match.quantity + 1
            productToAdd = {...productToAdd, quantity: match.quantity+1}
            //need to replace this element
            let newCart = cart.map(item =>{
                return item.id == productToAdd.id ? productToAdd : item})
            console.log('newcart', newCart)
            setCart(newCart)

            //also need to update document in cartitems
            //but only if a user is logged in
            if (user){
                updateDb(match.id, newQty)
                /*
                const cartRef = collection(db, 'cartitems')
                //find document with this userid and productid
                const q = query(cartRef, where("id", "==", match.id), where ("userId", "==", user?.uid))

                
                //look for matching document
                getDocs(q, cartRef)
                .then(res =>{
                    //is there a match?
                    if (res.size > 0){
                        //update with new qty
                        const docRef = doc(db,'cartitems', res.docs[0].id)
                        //update this doc
                        setDoc(docRef, {quantity: newQty}, {merge: true})
                        .then(res=>{
                            console.log('updated')
                        })
                        .catch(err => console.log(err))

                    }
                })    
                */        
        }
            
        }
        
    }
        
    

    const removeProduct = (prodId) =>{
        console.log("remove", prodId)
        let newCart = cart.filter(item => item.id !== prodId)
        setCart(newCart)
        

        //if user is logged in must delete all records
        //with this userid
        if (user){
            //find doc with this userid and prodId and delete
            const cartRef = collection(db, 'cartitems')
            //find document with this userid and productid
            const q = query(cartRef, where("id", "==", prodId), where ("userId", "==", user?.uid))

            //look for matching document
            getDocs(q, cartRef)
            .then(res =>{
                console.log('size is ', res.size)
                //is there a match?
                if (res.size > 0){
                    console.log('found in db')
                    //delete
                    const docRef = doc(db,'cartitems', res.docs[0].id)
                    deleteDoc(docRef)
                    .then(res=>{
                        console.log('doc for this item deleted')
                    })
                    .catch(err => console.log(err))

                }
            })
            

        }
    }

    const updateQty = (prodObj, inc) =>{
        //this function updates the quantity in this product
        console.log('update', prodObj)
        //what is current quantity
        let currentQty = prodObj.quantity
        console.log('current quantity is ', currentQty)
        let newQty = currentQty + inc
        console.log('new quantity will be ', newQty)
        //change quantity in the parameter
        prodObj = {...prodObj, quantity: newQty}
        console.log('new object', prodObj)
        //replace the cart object with this id with new obj
        const cartUpdate = cart.map(item=>{
            return item.id == prodObj.id ? prodObj: item
            }
        )
        console.log('updated cart', cartUpdate)
        //update state
        setCart(cartUpdate)
        //update the quantity in cartitems
        //if inc is true add 1, if false subtract 1
        //also need to update document in fb if user logged in
        //need to make separate function updateDb that is used
        //here and in add

        //also need to update document in cartitems
            //but only if a user is logged in
            if (user){

                updateDb(prodObj.id, newQty)
                /*
                console.log('need to update db id ', prodObj.id)
                const cartRef = collection(db, 'cartitems')
                //find document with this userid and productid
                const q = query(cartRef, where("id", "==", prodObj.id), where ("userId", "==", user?.uid))

                
                //look for matching document
                getDocs(q, cartRef)
                .then(res =>{
                    console.log('size is ', res.size)
                    //is there a match?
                    if (res.size > 0){
                        console.log('found in db')
                        //update with new qty
                        const docRef = doc(db,'cartitems', res.docs[0].id)
                        //update this doc
                        setDoc(docRef, {quantity: newQty}, {merge: true})
                        .then(res=>{
                            console.log('db updated')
                        })
                        .catch(err => console.log(err))

                    }
                }) 
                */           
        }

    }

    const updateDb = (prodId, qty) =>{
        console.log('need to update db id ', prodId)
                const cartRef = collection(db, 'cartitems')
                //find document with this userid and productid
                const q = query(cartRef, where("id", "==", prodId), where ("userId", "==", user?.uid))

                
                //look for matching document
                getDocs(q, cartRef)
                .then(res =>{
                    console.log('size is ', res.size)
                    //is there a match?
                    if (res.size > 0){
                        console.log('found in db')
                        //update with new qty
                        const docRef = doc(db,'cartitems', res.docs[0].id)
                        //update this doc
                        setDoc(docRef, {quantity: qty}, {merge: true})
                        .then(res=>{
                            console.log('db updated')
                        })
                        .catch(err => console.log(err))

                    }
                }) 
    }
    

    return(
        <CartContext.Provider value={{ cart, addProduct, removeProduct, setCart, updateQty }} >
            {props.children}
        </CartContext.Provider>
    )


}