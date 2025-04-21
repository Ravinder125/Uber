import React, { useState, useEffect } from 'react'
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from '../components/RidePopup';
import ComfirmRidePopup from '../components/ComfirmRidePopup';
import CaptainNav from '../components/CaptainNav';


const CaptainHome = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [ridePopup, setRidePopup] = useState(true)
    const [comfirmRidePopup, setComfirmRidePopup] = useState(false)


    useEffect(() => {

    }, [])

    return (
        <div className="relative">
            <CaptainNav darkModeEnabled={{ darkModeEnabled, setDarkModeEnabled }} sidebarVisible={{ sidebarVisible, setSidebarVisible }} />
            <div className="h-screen">
                <img src="map.gif" alt="Map" className="object-cover h-full w-full" />
            </div>
            <div className={`fixed z-10 bottom-0 w-full h-60 flex flex-col gap-5 p-3 shadow-lg transition-colors duration-400 ${darkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <CaptainDetails darkModeEnabled={darkModeEnabled} comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} />
            </div>
            <div className={`fixed h-fit w-full z-30 flex justify-center items-center transition-all duration-400 ease-in-out ${ridePopup ? 'bottom-10' : '-bottom-[64%]'} animate-slide`}>
                <RidePopup ridePopup={{ ridePopup, setRidePopup }} setComfirmRidePopup={setComfirmRidePopup} darkModeEnabled={darkModeEnabled} />
            </div>
            <div className={`fixed w-full h z-31 flex justify-center items-center transition-all duration-400 ease-in-out ${comfirmRidePopup ? 'bottom-0' : '-bottom-full'} animate-slide`} style={{ height: `calc(100vh - 67px)` }}>
                <ComfirmRidePopup comfirmRidePopup={{ comfirmRidePopup, setComfirmRidePopup }} darkModeEnabled={darkModeEnabled} />
            </div>
        </div>
    )
}

export default CaptainHome