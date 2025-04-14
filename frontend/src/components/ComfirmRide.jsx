import React from 'react'

const ComfirmRide = (props) => {
    const { setComfirmRide, ComfirmRide } = props.comfirmRide
    const { setVehicleFound } = props.setVehicleFound
    return (
        <div className="flex flex-col items-center w-full overflow-y-auto">
            <h5
                className="text-2xl transition-all duration-500 ease-in-out hover:bg-gray-200 w-fit rounded-full px-4 py-2 cursor-pointer"
                onClick={() => {
                    setComfirmRide(false);
                }}
            >
                <i className={`ri-arrow-${!ComfirmRide ? 'down' : 'up'}-wide-line`}></i>
            </h5>
            <div className="text-center w-full flex flex-col items-center">
                <h1 className="font-bold text-2xl">Comfirm you ride</h1>
                <div className="h-1 bg-gradient-to-r from-gray-300 via-green-400 to-gray-300 my-4 w-full rounded"></div>
                <img src="./car.png" alt="Car" className="w-30" />
            </div>
            <div className='w-full p-2 border-t border-gray-300 mt-2'>
                <div className="flex gap-4 items-center w-full p-2 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                    <h4 className="text-lg text-green-500">
                        <i className="ri-map-pin-3-fill"></i>
                    </h4>
                    <div>
                        <h2 className="font-medium">562/11-A</h2>
                        <h3 className="text-gray-600 text-sm">KaiKondrahalli, Bangaluru, Karnataka</h3>
                    </div>
                </div>
                <div className="flex gap-4 items-center w-full p-2 border-b border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
                    <h4 className="text-lg text-green-500">
                        <i class="ri-square-fill"></i>
                    </h4>
                    <div>
                        <h2 className="font-medium">Third Wave Coffee</h2>
                        <h3 className="text-gray-600 text-sm">17th Cross Rd, PWD Quarters, 1st, Sector </h3>
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
                        <h3 className="text-gray-600 text-sm">KaiKondrahalli, Bangaluru, Karnataka</h3>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                setComfirmRide(false)
                setVehicleFound(true)
            }} className='bg-green-700 font-bold text-xl text-white w-[80%] py-2 rounded-lg mt-2'>Confirm</button>
        </div>
    );
}

export default ComfirmRide