import React, { useState } from 'react';
import { add } from '../firebase/firebaseFunctions';
import { useSelector } from 'react-redux';
import ProductItem from './product';

export const Products = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [inputProduct, setInputProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    title: '',
    price: 0,
    category: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    // If the field is 'price', convert the value to a number before setting the state
    const value = e.target.name === 'price' ? parseInt(e.target.value) : e.target.value;
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const addProductMode = ()=>{
    setInputProduct(!inputProduct);
  }

  const addProduct = ()=>{
    add("products",newProduct);
    setNewProduct({ 
      title: '',
      price: 0,
      category: '',
      image: '',
      description: ''
    });
    setInputProduct(false);
  }

  return (
    <div>
       <h1>Products</h1>
      {
        products.map((pro)=>(
          <ProductItem key={pro.id} product={pro}/>
        ))
      }
      <button onClick={addProductMode}>Add New</button>
      {inputProduct &&
        <>
          <h3>Enter data for to add a new Product:</h3>
          Title: <input type='text' name='title' onChange={e => handleChange(e)}></input><br />
          Category:  <select name='category'  onChange={e => handleChange(e)}>
                <option value=''>Select category...</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
          </select><br />
          Price: <input type='number' name='price' onChange={e => handleChange(e)}></input><br />
          Link to pice: <input type='text' name='image' onChange={e => handleChange(e)}></input><br />
          Description:<br />
          <textarea type='text' name='description' onChange={e => handleChange(e)}></textarea><br />
          <button onClick={addProduct}>Save</button><button onClick={addProductMode}>Cancel</button>
        </> 
      }
    </div>
  )
}
export default Products
