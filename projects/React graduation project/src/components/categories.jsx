import React , { useState }from 'react'
import { useSelector } from 'react-redux';
import CategoryItem from './category';
import { add } from '../firebase/firebaseFunctions';

export const Categories = () => {
  
  const categories = useSelector((state) => state.categories.categories);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = ()=>{
    const newCat = {name: newCategory}
    add("categories",newCat);
    setNewCategory('');
  }

  return (
    <div>
      <h1>Categories</h1>
      {
        categories.map((cat)=>(
          <CategoryItem key={cat.id} category={cat}/>
        ))
      }
      <br></br>
      <input type='text' placeholder='Add new category' onChange={e=>setNewCategory(e.target.value)}></input> <button onClick={addCategory}>Add</button>
    </div>
  )
}
export default Categories
