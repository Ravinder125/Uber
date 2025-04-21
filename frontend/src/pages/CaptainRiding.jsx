import React, { useState } from 'react'
import CaptainNav from '../components/CaptainNav'
import CaptainFinishRide from '../components/CaptainFinishRide';

const CaptainRiding = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [finishRidePannel, setFinishRidePannel] = useState(false);
    return (
        <div className="relative">
            <CaptainNav darkModeEnabled={{ darkModeEnabled, setDarkModeEnabled }} sidebarVisible={{ sidebarVisible, setSidebarVisible }} />
            <div className="h-screen">
                <img src="map.gif" alt="Map" className="object-cover h-full w-full" />
            </div>
            <div className={`fixed py-10 px-5 bg-yellow-300 bottom-0 z-2 h-40 w-full`}>
                <div className='flex h-full justify-between items-start '>
                    <h2 className='font-bold text-2xl'>4 KM away</h2>
                    <button onClick={e => setFinishRidePannel(true)} className='p-2 px-11 font-medium text-2xl text-white bg-green-700 rounded-lg onClick={e=> setFinishRidePannel(true)} '>Complete</button>
                </div>
            </div>
            <div className={`fixed z-3 h-[90%] w-full transition-all duration-400 ease-in-out ${finishRidePannel ? 'bottom-0' : '-bottom-[81%]'}`}>
                <CaptainFinishRide darkModeEnabled={{ darkModeEnabled, setDarkModeEnabled }} finishRidePannel={{ finishRidePannel, setFinishRidePannel }} />
            </div>
        </div>
    )
}

export default CaptainRiding