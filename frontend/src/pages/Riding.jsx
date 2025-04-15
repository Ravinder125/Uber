import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../features/Loading';


const Riding = () => {
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 500);

    // }, [])

    // if (isLoading)
    //     return (
    //         <Loading />
    //     )
    return (
        <div className='relative'>
            <div className='h-screen'>
                <img src="map.gif" alt="map" className='h-screen object-cover' />
            </div>
            <img src="uber-logo.png" alt="uber-logo" className='w-20 fixed top-5 left-5' />
            <Link to='/home' className='fixed right-3 top-3 bg-white rounded-full flex items-center justify-center p-2 w-10 h-10 text-3xl cursor-pointer active:bg-gray-200'>
                <i class="ri-home-line"></i>
            </Link>
            <div >
                <div className='fixed bottom-0 z-5 h-3/5 bg-white w-full '>
                    <div>
                        <div className='flex justify-between w-full  p-3'>
                            <img src="car.png" alt="car" className='w-25 object-contain' />
                            <div className='text-end'>
                                <h4 className='text-gray-600 font-medium'>SANT</h4>
                                <h1 className='font-extrabold text-2xl'>KA15A00-0</h1>
                                <h4 className='text-gray-600 font-medium'>White Suzuki S-Presso LXI</h4>
                                <h4 className='text-gray-600 font-medium'>
                                    <i class="ri-star-fill"></i>
                                    <span>4.93 </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center w-full p-4 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                        <h4 className="text-lg text-green-500">
                            <i className="ri-map-pin-3-fill"></i>
                        </h4>
                        <div>
                            <h2 className="font-medium">562/11-A</h2>
                            <h3 className="text-gray-600 text-sm">KaiKondrahalli, Bangaluru, Karnataka</h3>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center w-full p-4 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                        <h4 className="text-lg text-green-500">
                            <i class="ri-currency-fill"></i>
                        </h4>
                        <div>
                            <h2 className="font-medium flex">
                                <i class="ri-money-rupee-circle-line"></i>
                                <div>193.20</div>

                            </h2>
                            <h3 className='text-gray-600 text-sm'>Cash Cash</h3>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center mt-5'>
                        <button className='w-1/2 p-3 bg-green-700 text-white font-bold rounded-lg '>Make a payment</button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Riding;