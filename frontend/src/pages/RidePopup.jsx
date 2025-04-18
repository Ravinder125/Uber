import React from 'react'

const RidePopup = (props) => {
    const darkModeEnabled = props.darkModeEnabled
    const { comfirmRidePopup, setComfirmRidePopup } = props.comfirmRidePopup
    return (
        <div className={`flex flex-col gap-3 items-center w-[90%] overflow-y-auto shadow-xl rounded-lg ${comfirmRidePopup ? 'bg-gray-800' : 'bg-gray-900'} ${darkModeEnabled ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h5
                className="text-3xl transition-all duration-500 ease-in-out hover:bg-gray-200 w-fit rounded-full px-4 py-2 cursor-pointer"
                onClick={e => setComfirmRidePopup(prev => !prev)}
            >
                <i className={`ri-arrow-${comfirmRidePopup ? 'down' : 'up'}-wide-line`}></i>
            </h5>
            <div className="text-center w-full flex flex-col items-center">
                <h1 className="font-bold text-2xl">Accept you ride</h1>
            </div>
            <div className='w-full p-2 border-t border-gray-300 mt-2'>
                <div className="flex gap-4 items-center w-full p-2 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                    <h4 className="text-lg text-green-500">
                        <i className="ri-map-pin-3-fill"></i>
                    </h4>
                    <div>
                        <h2 className="font-medium">562/11-A</h2>
                        <h3 className="text-gray-400 text-sm">KaiKondrahalli, Bangaluru, Karnataka</h3>
                    </div>
                </div>
                <div className="flex gap-4 items-center w-full p-2 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                    <h4 className="text-lg text-green-500">
                        <i class="ri-square-fill"></i>
                    </h4>
                    <div>
                        <h2 className="font-medium">Third Wave Coffee</h2>
                        <h3 className="text-gray-400 text-sm">17th Cross Rd, PWD Quarters, 1st, Sector </h3>
                    </div>
                </div>
                <div className="flex gap-4 items-center w-full p-2 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                    <h4 className="text-lg text-green-500">
                        <i class="ri-currency-fill"></i>
                    </h4>
                    <div>
                        <h2 className="font-medium flex">
                            <i class="ri-money-rupee-circle-line"></i>
                            <div>193.20</div>
                        </h2>
                        <h3 className="text-gray-400 text-sm">KaiKondrahalli, Bangaluru, Karnataka</h3>
                    </div>
                </div>
            </div>
            <div className='text-center flex gap-2 mb-5'>
                <button className='bg-green-700 px-5 font-medium text-xl text-white py-2 rounded-lg mt-2'>Accept</button>
                <button className={`text-black px-5 font-medium py-2 rounded-lg mt-2 ${darkModeEnabled ? 'bg-white' : 'bg-gray-300'}`}>Ignore</button>
            </div>
        </div>
    )
}

export default RidePopup