import { useState, useEffect, useCallback } from 'react'; 
import { Routes, Route} from 'react-router-dom';
import { query, collection, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import db from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import { usersActions } from './redux/usersSlice';
import { categoriesActions } from './redux/categoriesSlice';
import { productsActions } from './redux/productsSlice';
import { ordersActions } from './redux/ordersSlice';
import User from './pages/userPage';
import Admin from './pages/adminPage';
import Products from './components/admin/products';
import Categories from './components/admin/categories';
import Customers from './components/admin/customers';
import Statistics from './components/admin/statistics';
import ListProducts from './components/users/listProducts';
import MyOrders from './components/users/myOrders';
import MyAccount from './components/users/myAccount';
import LogOut from './components/LogOut';




function App() {
  const dispatch = useDispatch();

  const fetchData = useCallback(async (collectionName) => {
    const q = query(collection(db, collectionName));

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      if (collectionName === 'users') {
        dispatch(usersActions.load(data));
      } else if (collectionName === 'categories') {
        dispatch(categoriesActions.load(data));
      } else if (collectionName === 'products') {
        dispatch(productsActions.load(data));
      } else if (collectionName === 'orders') {
        dispatch(ordersActions.load(data));
      }
    });
  }, [dispatch]); 

  useEffect(() => {
    fetchData('categories');
    fetchData('users');
    fetchData('products');
    fetchData('orders');
  }, [fetchData]); 

  return (
    <>
      <Routes>
        {/* Dynamic Routing - Params */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Dynamic Routing - Admin */}
        <Route path='/admin' element={<Admin />} >
          <Route  path='categories' element={<Categories />} />
          <Route  path='products' element={<Products />} />
          <Route  path='customers' element={<Customers />} />
          <Route  path='statistics' element={<Statistics />} />
          <Route  path='log out' element={<LogOut />} />
        </Route>

        {/* Dynamic Routing - User */}
        <Route path='/user' element={<User />} >
          <Route  path='products' element={<ListProducts />} />
          <Route  path='my orders' element={<MyOrders />} />
          <Route  path='my account' element={<MyAccount />} />
          <Route  path='log out' element={<LogOut />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
