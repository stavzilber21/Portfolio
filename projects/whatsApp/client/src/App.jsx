import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';


function App() {

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
