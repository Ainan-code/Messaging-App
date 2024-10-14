
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {Toaster} from"react-hot-toast"
import AuthContext from '../context/AuthContext';
import AuthProvider from '../context/AuthProvider';

function App() {
  const auth = () => {
    useContext(AuthContext)
  }

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <AuthProvider>
   <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/signup' element={ auth.authUser ? <Navigate to={"/"}/> : <Signup/>} />

   </Routes>
   </AuthProvider>
   <Toaster/>
    </div>
  )
}

export default App
