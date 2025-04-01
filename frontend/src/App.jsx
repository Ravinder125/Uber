import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister.jsx'
import UserDashboard from './pages/UserDashboard'

const App = () => {
  return (
    <div>
      {/* Creating Routes */}
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-register' element={<CaptainRegister />} />
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes >
    </div >
  )
}

export default App