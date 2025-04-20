import React from 'react'
import CaptainSidebar from './CaptainSidebar'

const CaptainNav = (props) => {
    const { sidebarVisible, setSidebarVisible } = props.sidebarVisible
    const { darkModeEnabled, setDarkModeEnabled } = props.darkModeEnabled
    return (
        <>
            <nav className={`flex z-50 border-b border-gray-300 p-3 w-full fixed top-0  text-2xl justify-between items-center font-medium ${darkModeEnabled ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className={`absolute top-0 -left-full w-[80%] text-lg z-50 rounded-md   flex flex-col justify-center gap-2 transition-all duration-800 ease-in-out ${darkModeEnabled ? 'bg-gray-800 text-white shadow-md shadow-gray-800 border border-gray-900' : 'bg-white text-gray-700 border border-gray-300 shadow-md'} ${sidebarVisible ? 'left-0' : '-left-full'}`} >
                    <CaptainSidebar setSidebarVisible={setSidebarVisible} darkModeEnabled={darkModeEnabled} />
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
        </>
    )
}

export default CaptainNav