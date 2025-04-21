import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CaptainHome from '../pages/CaptainHome.jsx'
import Start from '../pages/Start'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import UserLogout from '../pages/UserLogout'
import CaptainRegister from '../pages/CaptainRegister.jsx'
import CaptainLogin from '../pages/CaptainLogin'
import CaptainLogout from '../pages/CaptainLogout.jsx'
import UserDashboard from '../pages/UserDashboard'
import UserProtectWrapper from '../pages/UserProtectWrapper.jsx'
import CaptainProtectWrapper from '../pages/CaptainProtectWrapper.jsx'
import Riding from '../pages/Riding.jsx'
import CaptainRiding from '../pages/CaptainRiding.jsx'




const AppRoutes = () => {
    return (
        <div>
            {/* Creating Routes */}
            <Routes>
                <Route path='/' element={<Start />} />
                <Route path='/home' element={
                    <UserProtectWrapper >
                        <Home />
                    </UserProtectWrapper>}
                />
                <Route path='/register' element={<UserRegister />} />
                <Route path='/login' element={<UserLogin />} />
                <Route path='/logout' element={
                    <UserProtectWrapper>
                        <UserLogout />
                    </UserProtectWrapper>}
                />
                <Route path='/dashboard' element={<UserDashboard />} />
                <Route path='/riding' element={
                    <UserProtectWrapper>
                        <Riding />
                    </UserProtectWrapper>
                }
                />

                <Route path='/captain-home' element={
                    <CaptainProtectWrapper>
                        <CaptainHome />
                    </CaptainProtectWrapper>
                } />
                <Route path='/captain-register' element={<CaptainRegister />} />
                <Route path='/captain-login' element={<CaptainLogin />} />
                <Route path='/captain-logout' element={
                    <CaptainProtectWrapper>
                        <CaptainLogout />
                    </CaptainProtectWrapper>
                } />
                <Route path='/captain-riding' element={
                    <CaptainProtectWrapper>
                        <CaptainRiding />
                    </CaptainProtectWrapper>
                }
                />
            </Routes >
        </div>
    )
}

export default AppRoutes