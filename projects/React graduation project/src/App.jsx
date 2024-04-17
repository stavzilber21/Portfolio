import { useState,useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { query, collection, onSnapshot } from "firebase/firestore"
import { useDispatch } from "react-redux"
import db from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import { usersActions } from './redux/usersSlice';
import { categoriesActions } from './redux/categoriesSlice';
import { productsActions } from './redux/productsSlice';
import { ordersActions } from './redux/ordersSlice';
import User from './pages/userPage';
import Admin from './pages/adminPage';

function App() {

  const dispatch = useDispatch()


  const fetchData = async (collectionName) => {
    const q = query(collection(db, collectionName))

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data()}
      })
      if(collectionName==='users'){
        dispatch(usersActions.load(data));
      }
      else if(collectionName==='categories'){
        dispatch(categoriesActions.load(data));
      }
      else if(collectionName==='products'){
        dispatch(productsActions.load(data));
      }
      else if(collectionName==='orders'){
        dispatch(ordersActions.load(data));
      }
    })
  }

  useEffect(() => {
    fetchData('categories');
    fetchData('users');
    fetchData('products');
    fetchData('orders');
  }, [])

  return (
    <>

    <Routes>

        {/* Dynamic Routing - Params */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Dynamic Routing - Admin */}
        <Route path='/admin' element={<Admin />} >
          <Route  path='products' element={<Login />}/>
        </Route>

        {/* Dynamic Routing - User */}
        <Route path='/user' element={<User />} >
          <Route  path='products' element={<Login />}/>
        </Route>

    </Routes>
    </>
  )
}

export default App
