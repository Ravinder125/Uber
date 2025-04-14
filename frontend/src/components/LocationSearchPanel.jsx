import React from 'react'

const LocationSearchPanel = (props) => {

    // sample array of locations
    const locations = [
        "A-194, Stree no. 2, pust 0, Soniya Vihar, Karawal nagar, North East delhi",
        "A-194, Stree no. 2, pust 0, Soniya Vihar, Karawal nagar, North East delhi",
        "A-194, Stree no. 2, pust 0, Soniya Vihar, Karawal nagar, North East delhi",
    ]

    const { setVehiclePanel } = props.setVehiclePanel
    const { setPanelOpen } = props.panel
    return (
        <div className='overflow-y-auto h-[85%] py-3 '>
            {/* This is just a example of location search panel */}
            {
                locations.map((location, index) => (
                    <div
                        key={index}
                        className='flex hover:bg-gray-50 active:bg-gray-200 flex-colr gap-3 p-3 justify-center items-center mt-1 border-b-1 border-gray-200 '
                        onClick={() => {
                            setVehiclePanel(prev => !prev)
                            setPanelOpen(false)
                        }}
                    >
                        <h4 className='bg-gray-200 px-3 py-2 rounded-full text-xl w-fit'><i class="ri-map-pin-2-fill"></i></h4>
                        <div className='flex flex-col text-sm'>
                            <h1 className='font-bold text-[16px]'>Third Wave College</h1>
                            <h2>{location}</h2>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default LocationSearchPanel