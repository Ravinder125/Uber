import React from 'react'
import { Link } from 'react-router-dom'

const CaptainSidebar = (props) => {
    return (
        <>
            <div className='w-full'>
                <div className={`flex flex-col gap-5 text-black p-5 relative ${props.darkModeEnabled ? 'bg-gray-200' : 'bg-yellow-300'}`}>
                    <h4 onClick={() => props.setSidebarVisible(false)} className={`text-xl flex justify-center items-center absolute right-1 top-1 shadow-xl shadow-yellow-500 rounded-md w-8 h-8}`}>
                        <i className="ri-close-large-fill"></i>
                    </h4>
                    <div className='flex items-center gap-2'>
                        <img src="driver.jpg" alt="" className='rounded-full w-12 h-12 object-cover' />
                        <h4 className='font-medium'>Deadpool Kumar singh</h4>
                    </div>
                    <div>
                        <div className='flex items-center justify-between text-center'>
                            <div>
                                <i class="ri-timer-2-line text-2xl font-thin"></i>
                                <h3 className='font-medium '>10.2</h3>
                                <h4 className='text-xs'>Hours Online</h4>
                            </div>
                            <div>
                                <i class="ri-speed-up-line text-2xl font-thin"></i>
                                <h3 className='font-medium '>30K</h3>
                                <h4 className='text-xs'>Total Distance</h4>
                            </div>
                            <div>
                                <i class="ri-booklet-fill text-2xl font-thin"></i>
                                <h3 className='font-medium '>30K</h3>
                                <h4 className='text-xs'>Hours Online</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-5 flex flex-col gap-2'>
                    <Link to='/captain-home' className='flex gap-1 mt-2 '>
                        <i class="ri-home-line text-xl"></i>
                        <span className='hover:underline'>Home</span>
                    </Link>
                    <Link to='/captain-wallet' className='flex gap-1 mt-2 '>
                        <i class="ri-wallet-line"></i>
                        <span className='hover:underline'>Wallet</span>
                    </Link>
                    <Link to='/captain-about' className='flex gap-1 mt-2'>
                        <i class="ri-information-line text-xl"></i>
                        <span className=' hover:underline'>About</span>
                    </Link>
                    <Link to='/captain-history' className='flex gap-1 mt-2 '>
                        <i class="ri-history-line"></i>
                        <span className='hover:underline'>History</span>
                    </Link>
                    <Link to='/captain-notification' className='flex gap-1 mt-2 '>
                        <i class="ri-notification-line"></i>
                        <span className='hover:underline'>Notifications</span>
                    </Link>
                    <Link to='/captain-saving' className='flex gap-1 mt-2 '>
                        <i class="ri-logout-box-r-line text-xl"></i>
                        <span className='hover:underline'>Savings</span>
                    </Link>
                    <Link to='/captain-logout' className='flex gap-1 mt-2 '>
                        <i class="ri-logout-box-r-line text-xl"></i>
                        <span className='hover:underline'>Logout</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CaptainSidebar