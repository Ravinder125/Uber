import React from 'react'

const WaitingForDriver = () => {
    return (
        <div className='bg-white '>
            <h5
                className="text-2xl transition-all duration-500 ease-in-out hover:bg-gray-200 w-fit rounded-full px-4 py-2 cursor-pointer"
            >
                <i className={`ri-arrow-up-wide-line`}></i>
            </h5>
            <div className='flex p-3 justify-between items-center border-b border-gray-200'>
                <h2 className='font-bold text-xl'>Meet at the pickup point</h2>
                <div className='text-white bg-black px-3 py-1 text-center'>
                    <h4>2 <br /> min</h4>
                </div>
            </div>
            <div className='flex flex-col gap-10 border-b border-gray-200 py-2'>
                <div className='flex p-3 justify-between text-end items-center'>
                    <div className='flex  '>
                        <img src="./driver.jpg" alt="man" className='w-15 h-15 z-3 object-cover rounded-full border-gray' />
                        <img src="./carPic.jpeg" alt="car" className='w-15 ml-[-30px] left-5 h-15 object-cover rounded-full ' />
                    </div>
                    <div>
                        <h4 className='text-gray-600 font-medium'>SANT</h4>
                        <h1 className='font-extrabold text-2xl'>KA15A00-0</h1>
                        <h4 className='text-gray-600 font-medium'>White Suzuki S-Presso LXI</h4>
                        <h4 className='text-gray-600 font-medium'>
                            <i class="ri-star-fill"></i>
                            <span>4.9</span>
                        </h4>
                    </div>
                </div>
                <div className='p-3'>
                    <div className='font-medium  text-gray-700 bg-gray-200 p-3 px-4 w-1/2 rounded-full  flex'>
                        <input type="text" name="message" className='w-full outline-none border-none ' placeholder='Send a message...' />
                        <span className='hover:bg-gray-400 rounded-full p-1 px-2'><i className="ri-send-plane-2-fill"></i></span>
                    </div>
                </div>
                <div className='flex justify-around items-center'>
                    <div className='flex  flex-col justify-center items-center gap-2 text-center'>
                        <h4 className='text-green-500 text-2xl bg-gray-200 rounded-full h-13 w-13 flex justify-center items-center'>
                            <i class="ri-shield-fill"></i>
                        </h4>
                        <h4 className='font-medium text-lg'>Safety</h4>
                    </div>
                    <div className='flex  flex-col justify-center items-center gap-2 text-center'>
                        <h4 className='text-green-500 text-2xl bg-gray-200 rounded-full h-13 w-13 flex justify-center items-center'>
                            <i class="ri-map-pin-4-fill"></i>
                        </h4>
                        <h4 className='font-medium text-lg'>Share my trip</h4>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-center'>
                        <h4 className='text-green-500 text-2xl bg-gray-200 rounded-full h-13 w-13 flex justify-center items-center'>
                            <i class="ri-phone-fill"></i>
                        </h4>
                        <h4 className='font-medium text-lg'>Call driver</h4>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 items-center p-5 '>
                <h4> <i className="ri-map-pin-3-fill"></i></h4>
                <div>
                    <h2 className='font-extrabold text-xl'>562/11-A</h2>
                    <h4 className='font-medium text-sm text-gray-600'>Kaikondrahalli, Bengaluru, Karnataka</h4>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver 