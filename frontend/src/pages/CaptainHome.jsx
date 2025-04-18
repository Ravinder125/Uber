import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from './RidePopup';


const CaptainHome = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [comfirmRidePopup, setComfirmRidePopup] = useState(false)


    useEffect(() => {

    }, [])

    return (
        <div>
            <nav className={`relative flex p-3 w-full fixed top-0  text-2xl justify-between items-center font-medium ${darkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className={`absolute top-0 -left-full  text-lg z-50 rounded-md   flex flex-col justify-center gap-2 p-5 transition-all duration-200 ease-in-out ${darkModeEnabled ? 'bg-gray-800 text-white border-none shadow-md shadow-gray-800' : 'bg-white text-gray-700 border border-gray-300 shadow-md'} ${sidebarVisible ? 'left-0' : '-left-full'}`} >
                    <h4 onClick={() => setSidebarVisible(false)} className='text-lg'>
                        <i className="ri-close-large-fill"></i>
                    </h4>
                    <div>
                        <Link to='/captain-home' className='flex gap-1 mt-2 '>
                            <i class="ri-home-line text-2xl"></i>
                            <span>Home</span>
                        </Link>
                        <Link to='/about' className='flex gap-1 mt-2 '>
                            <i class="ri-information-line text-2xl"></i>
                            <span>About</span>
                        </Link>
                        <Link to='/captain-logout' className='flex gap-1 mt-2 '>
                            <i class="ri-logout-box-r-line text-2xl"></i>
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
                <h4 onClick={e => setSidebarVisible(true)} className="transition-all duration-500 ease-in-out cursor-pointer">
                    <i class="ri-menu-line"></i>
                </h4>
                <span>Offline</span>
                <h4
                    className="text-4xl cursor-pointer"
                    onClick={() => setDarkModeEnabled(prev => !prev)}
                >
                    {darkModeEnabled ? (
                        <i className="ri-toggle-fill"></i>
                    ) : (
                        <i className="ri-toggle-line"></i>
                    )}
                </h4>
            </nav >
            <div>
                <img src="map.gif" alt="" className='h-screen object-cover' />
                <div>
                    <div className={`fixed bottom-0  w-full h-60 flex flex-col gap-5 p-3  shadow-lg ${darkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        <CaptainDetails darkModeEnabled={darkModeEnabled} comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} />
                    </div>
                    <div className={`fixed h-fit w-full z-30 flex justify-center items-center transition-all duration-500 ease-in-out ${comfirmRidePopup ? 'bottom-10' : '-bottom-[53%]'}`}>
                        <RidePopup comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} darkModeEnabled={darkModeEnabled} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CaptainHome