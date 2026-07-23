import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { userDataContext } from './context/UserContext'
import Profile from './pages/Profile'
import Network from './pages/Network'
function App() {
  let {userData}=useContext(userDataContext)
  return (
   <Routes>
    <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/> if user data present remain on home otherwise napvigate to login
    <Route path='/signup' element={userData?<Navigate to="/"/>:<Signup/>}/>
    <Route path='/login' element={userData?<Navigate to="/"/>:<Login/>}/>
    <Route path='/network' element={userData?<Network/>:<Navigate to="/login"/>}/>
    <Route path='/profile' element={userData?<Profile/>:<Navigate to="/login"/>}/>
   </Routes>
  )
}

export default App
