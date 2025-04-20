import React from 'react'

const RidePopup = (props) => {
    const darkModeEnabled = props.darkModeEnabled
    const setComfirmRidePopup = props.setComfirmRidePopup
    const { ridePopup, setRidePopup } = props.ridePopup
    return (
        <div className={`flex border flex-col gap-3 items-center w-[90%] overflow-y-auto shadow-xl rounded-lg ${ridePopup ? 'bg-gray-800' : 'bg-gray-900'} ${darkModeEnabled ? 'bg-gray-800 text-white border-gray-900' : 'bg-white text-black border-gray-300'}`}>
            <div className='px-2 w-full flex flex-col gap-3'>
                <div className="text-center w-full flex flex-col items-center">
                    <h5
                        className="text-3xl transition-all duration-500 ease-in-out hover:bg-gray-200 w-fit rounded-full px-4 py-2 cursor-pointer"
                        onClick={e => setRidePopup(prev => !prev)}
                    >
                        <i className={`ri-arrow-${ridePopup ? 'down' : 'up'}-wide-line`}></i>
                    </h5>
                    <h1 className="font-bold text-2xl">New ride available</h1>
                </div>
                <div className={`flex p-2 w-full justify-between items-center p-3 rounded-lg  ${darkModeEnabled ? 'bg-gray-300 text-black' : 'bg-yellow-300'}`}>
                    <div className='flex items-center gap-3'>
                        <img src="passenger.jpg" alt="" className='w-12 h-12 object-cover rounded-full' />
                        <h4 className='font-medium'>Spider Singh</h4>
                    </div>
                    <h4 className='font-medium text-lg'>
                        2.2 km
                    </h4>
                </div>
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
                            <div>&#8377;193.20</div>
                        </h2>
                        <h3 className="text-gray-400 text-sm">Cash</h3>
                    </div>
                </div>
            </div>
            <div className='text-center flex gap-2 mb-5'>
                <button onClick={e => setComfirmRidePopup(true)} className='bg-green-700 px-5 font-medium text-xl text-white py-2 rounded-lg mt-2'>Accept</button>
                <button onClick={e => setRidePopup(false)} className={`text-black px-5 font-medium py-2 rounded-lg mt-2 bg-gray-300`}>Ignore</button>
                {/* ${darkModeEnabled ? 'bg-gray-100' : 'bg-yellow-100'} */}
            </div>
        </div>
    )
}

export default RidePopup