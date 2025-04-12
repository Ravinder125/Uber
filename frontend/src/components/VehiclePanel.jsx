import React from 'react'

const VehiclePanel = () => {
    return (
        <>
            <h1 className="text-2xl font-semibold">Choose your ride</h1>
            {/* Ride Option 1 */}
            <div className="w-full active:border-4 active:border-black border border-gray-200 rounded-3xl bg-white flex p-3 items-center shadow-lg">
                <img src="./car.png" alt="car" className="w-20" />
                <div className="flex flex-col text-sm w-1/2">
                    <h2 className="flex gap-1 items-center">
                        <span className="text-xl font-semibold">UberGo</span>
                        <i className="ri-user-fill"></i>
                        <span>4</span>
                    </h2>
                    <h3>2 mins away &bull; 15:20</h3>
                    <h3 className="text-gray-700">Affordable, compact rides</h3>
                </div>
                <h2 className="self-start text-lg">
                    <i className="ri-money-rupee-circle-fill"></i>193.20
                </h2>
            </div>

            {/* Ride Option 2 */}
            <div className="w-full active:border-4 active:border-black border border-gray-200 rounded-3xl bg-white flex p-3 items-center shadow-lg">
                <img src="./bike.png" alt="bike" className="w-20" />
                <div className="flex flex-col text-sm w-1/2">
                    <h2 className="flex gap-1 items-center">
                        <span className="text-xl font-semibold">Moto</span>
                        <i className="ri-user-fill"></i>
                        <span>1</span>
                    </h2>
                    <h3>3 mins away &bull; 15:20</h3>
                    <h3 className="text-gray-700">Affordable, compact rides</h3>
                </div>
                <h2 className="self-start text-lg">
                    <i className="ri-money-rupee-circle-fill"></i>66.17
                </h2>
            </div>
            {/* Ride Option 3 */}
            <div className="w-full active:border-4 active:border-black border border-gray-200 rounded-3xl bg-white flex p-3 items-center shadow-lg">
                <img src="./auto.png" alt="auto" className="w-20" />
                <div className="flex flex-col text-sm w-1/2">
                    <h2 className="flex gap-1 items-center">
                        <span className="text-xl font-semibold">Premier</span>
                        <i className="ri-user-fill"></i>
                        <span>4</span>
                    </h2>
                    <h3>4 mins away &bull; 15:20</h3>
                    <h3 className="text-gray-700">Affordable, compact rides</h3>
                </div>
                <h2 className="self-start text-lg">
                    <i className="ri-money-rupee-circle-fill"></i>193.20
                </h2>
            </div>
        </>
    )
}

export default VehiclePanel