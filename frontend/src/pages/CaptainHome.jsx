import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from './RidePopup';
import CaptainSidebar from '../components/CaptainSidebar';
import CaptainNav from '../components/CaptainNav';


const CaptainHome = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [comfirmRidePopup, setComfirmRidePopup] = useState(true)


    useEffect(() => {

    }, [])

    return (
        <div>

            <div>
                <img src="map.gif" alt="" className='h-screen object-cover' />
                <div>
                    <CaptainNav darkModeEnabled={{ darkModeEnabled, setDarkModeEnabled }} sidebarVisible={{ sidebarVisible, setSidebarVisible }} />
                    <div className={`fixed bottom-0  w-full h-60 flex flex-col gap-5 p-3  shadow-lg ${darkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        <CaptainDetails darkModeEnabled={darkModeEnabled} comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} />
                    </div>
                    <div className={`fixed h-fit w-full z-30 flex justify-center items-center transition-all duration-800 ease-in-out ${comfirmRidePopup ? 'bottom-10' : '-bottom-[64%]'} animate-slide`}>
                        <RidePopup comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} darkModeEnabled={darkModeEnabled} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CaptainHome