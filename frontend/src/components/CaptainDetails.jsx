import React from 'react'

const CaptainDetails = (props) => {
    const darkModeEnabled = props.darkModeEnabled;
    const { comfirmRidePopup, setComfirmRidePopup } = props.comfirmRidePopup;
    return (
        <div className='h-full'>
            <div className='h-[30%]'>
                <div className='flex justify-between h-full items-center  w-full'>
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
            <div className={`flex items-center justify-around text-center h-[50%] rounded-lg ${darkModeEnabled ? 'bg-gray-300 text-black ' : 'bg-yellow-300 text-black'}`}>
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
            {/* <h4
                className="text-3xl h-[20%] flex items-center justify-center  transition-all duration-500 ease-in-out hover:bg-gray-200  rounded-full px-4 py-2 cursor-pointer"
                onClick={() => {
                    setComfirmRidePopup(true);
                }}
            >
                <i className={`ri-arrow-${comfirmRidePopup ? 'down' : 'up'}-wide-line`}></i>
            </h4> */}
        </div>
    )
}

export default CaptainDetails