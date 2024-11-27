import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';


import Home from './pages/home';

// const USERS_URL = 'http://localhost:3000/user';
// const MESSAGES_URL = 'http://localhost:3000/messages';

function App() {
  // const dispatch = useDispatch();
  // const fetchData = useCallback(async (collectionName) => {
  //   if (collectionName === 'users') {
  //     const {data} = await axios.get(USERS_URL);
  //     console.log(data);
      
  //     dispatch(usersActions.load(data));
  //   } else if (collectionName === 'messages') {
  //     const { data} = await axios.get(MESSAGES_URL);
  //     console.log(data);
  //     dispatch(messagesActions.load(data));
  //   }
  // }, [dispatch]); 

  // useEffect(() => {
  //   fetchData('users');
  //   fetchData('messages');
  // }, [fetchData]); 

  return (
    <>
     <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/register' element={<Register />} />
     <Route path ='/home' element={<Home/>}></Route>
     </Routes>
    </>
  )
}

export default App
