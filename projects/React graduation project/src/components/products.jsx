import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import ProductItem from './product';

export const Products = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
       <h1>Products</h1>
      {
        products.map((pro)=>(
          <ProductItem key={pro.id} product={pro}/>
        ))
      }
      <button>Add New</button>
    </div>
  )
}
export default Products
