import React from 'react'

const CaptainHome = () => {
    return (
        <div>
            <nav className=' flex p-3 w-full fixed top-0 bg-white text-2xl justify-between items-center font-medium'>
                <h4>
                    <i class="ri-menu-line"></i>
                </h4>
                <span>Offline</span>
                <h4 className='text-4xl'>
                    <i class="ri-toggle-line"></i>
                    <i class="ri-toggle-fill"></i>
                </h4>
            </nav>
            <div>
                <img src="map.gif" alt="" className='h-screen object-cover' />
                <div>
                    <div className='fixed bottom-0 bg-white w-full h-60 flex flex-col gap-5 p-5 shadow-lg '>
                        <div className='flex gap-5'>
                            <img src="driver.jpg" alt="" className='rounded-full w-10 h-10 object-cover' />
                            <h4>
                                <h3 className='font-medium'>Deadpool Kumar Singh</h3>
                                <h4 className='text-sm text-gray-400'>Basic level</h4>
                            </h4>
                        </div>
                        <div className='flex items-center justify-around text-center bg-yellow-400 h-full rounded-lg'>
                            <h4>
                                <h4 className='text-3xl '>
                                    <i class="ri-timer-2-line"></i>
                                </h4>
                                <h3 className='font-medium text-lg'>10.2</h3>
                                <h4 className='text-sm'>Hours Online</h4>
                            </h4>
                            <h4>
                                <h4 className='text-3xl '>
                                    <i class="ri-timer-2-line"></i>
                                </h4>
                                <h3 className='font-medium text-lg'>30K</h3>
                                <h4 className='text-sm'>Total Distance</h4>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptainHome