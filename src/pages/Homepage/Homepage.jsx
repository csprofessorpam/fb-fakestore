//import axios from 'axios'
import React from 'react'
import "./Homepage.css"
import  axios  from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';



function Homepage() {

  const [categories, setCategories] = React.useState([])

  const [products, setProducts] = React.useState([])

  const [selectedCategory, setSelectedCategory] = React.useState('')
    //get categories when the page loads
    React.useEffect(
        ()=>{
          //get categories
            axios.get("https://fakestoreapi.com/products/categories")
            .then(res =>{
                //console.log(res.data)
                //add "all" as first one
                setCategories(["all", ...res.data])
            })
            .catch(err => console.log(err))

            //get all products
            axios.get("https://fakestoreapi.com/products")
            .then(res =>{
              //console.log(res.data)
              setProducts(res.data)
            })
            .catch(err => console.log(err))

        }, []
    )

    //second useEffecct to get products
    //default to all products when page loads
    //re run if selectedcategory changes

    // React.useEffect(
    //   ()=>{
    //     const url = selectedCategory==="all"?
    //     "https://fakestoreapi.com/products"
    //     :
    //     `https://fakestoreapi.com/products/category/${selectedCategory}`

    //     axios.get(url)
    //     .then(res =>{
    //       console.log(res.data)
    //       setProducts(res.data)
    //     })
    //     .catch(err => console.log(err))

    //   }, [selectedCategory]
    // )

    const filterProducts = (category)=>{
      console.log('category is ', category)

        const url = category==="all"?
        "https://fakestoreapi.com/products"
        :
        `https://fakestoreapi.com/products/category/${category}`

      axios.get(url)
        .then(res =>{
          console.log(res.data)
          setProducts(res.data)
        })
        .catch(err => console.log(err))

    }
  return (
    <div className="homepage-container">
      <div className="categories-container">
       
        {
          categories.map((item, index) => <button key={index}
          onClick={()=>filterProducts(item)}>{item}</button>)
          // categories.map((item, index) => <button key={index}
          // onClick={()=>setSelectedCategory(item)}>{item}</button>)
        }
      </div>
      <div className="products-container">
        {
          // products.map(item => <p>{item.title}</p>)
          products && products.map(item => <ProductCard key={item.id} product={item} />)
        }
      </div>

    </div>
  )
}

export default Homepage