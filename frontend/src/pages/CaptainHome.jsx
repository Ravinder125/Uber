import React, { useState, useEffect } from 'react'

const CaptainHome = () => {
    const [isdark, setIsdark] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <div>
            <nav className={`flex p-3 w-full fixed top-0  text-2xl justify-between items-center font-medium ${isdark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <h4>
                    <i class="ri-menu-line"></i>
                </h4>
                <span>Offline</span>
                <h4 className='text-4xl cursor-pointer'
                    onClick={e => setIsdark(!isdark)}
                >{
                        isdark ? (<i class="ri-toggle-fill"></i>
                        ) : <i class="ri-toggle-line"></i>
                    }
                </h4>
            </nav>
            <div>
                <img src="map.gif" alt="" className='h-screen object-cover' />
                <div>
                    <div className={`fixed bottom-0  w-full h-50 flex flex-col gap-5 p-3  shadow-lg ${isdark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        <div>
                            <div className='flex justify-around w-full'>
                                <div className='flex gap-2'>
                                    <img src="driver.jpg" alt="" className='rounded-full w-10 h-10 object-cover' />
                                    <div>
                                        <h3 className='font-medium'>Deadpool Kumar Singh</h3>
                                        <h4 className='text-sm text-gray-400'>Basic level</h4>

                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h4>&#8377; 295.20</h4>
                                    <h5 className='text-sm text-gray-700'>Earned</h5>
                                </div>
                            </div>
                        </div>
                        <div className={`flex items-center justify-around text-center bg-gray-200 h-full rounded-lg ${isdark ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}>
                            <div>
                                <i class="ri-timer-2-line text-2xl font-thin"></i>
                                <h3 className='font-medium '>10.2</h3>
                                <h4 className='text-xs'>Hours Online</h4>
                            </div>
                            <div>
                                <i class="ri-speed-up-line text-2xl"></i>
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
            </div>
        </div >
    )
}

export default CaptainHome