import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';


const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            pickup,
            destination
        };

        console.log(data); // optional: for debugging
    };

    return (
        <div>
            <img
                src="./uber-logo.png"
                alt="uber-logo"
                className='w-18 absolute left-5 top-5 self-center'
            />
            <div className='h-screen'>
                <img
                    src="./map.gif"
                    alt="map"
                    className='w-full h-full object-cover'
                />
            </div>
            <div
                className={`absolute transition-all duration-500 ease-in-out bg-white bottom-0 w-full p-6 ${panelOpen ? 'h-screen' : 'h-auto'}`}
            >
                <div className='h-[30%] '>
                    {panelOpen ? (<h5
                        className='hover:bg-gray-200 w-fit rounded-full px-2 py-1 cursor-pointer'
                        onClick={() => setPanelOpen(prev => !prev)}
                    >
                        <i className="ri-arrow-down-wide-line "></i>
                    </h5>) :
                        (<h5
                            className='hover:bg-gray-200 w-fit rounded-full px-2 py-1 cursor-pointer'
                            onClick={() => setPanelOpen(prev => !prev)}
                        >
                            <i className="ri-arrow-up-wide-line "></i>
                        </h5>)}
                    <h4 className='text-2xl font-bold mb-3'>Find a trip</h4>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <input
                            type="text"
                            name="pickup"
                            placeholder='Add a pickup-location'
                            required
                            className='w-full text-center bg-gray-200 p-2 border border-gray-300 rounded'
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        <input
                            type="text"
                            name="destination"
                            placeholder='Enter your destination'
                            required
                            className='w-full text-center bg-gray-200 p-2 border border-gray-300 rounded placeholder:text-gray-800'
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        {!panelOpen ? <div className="line absolute w-1 h-18 left-8 top-28 bg-black rounded-full "></div> : null}
                    </form>
                </div>
                <div
                    className={`overflow-hidden  rounded-xl transition-all duration-200 ease-in-out ${panelOpen ? 'h-[70%] opacity-100' : 'h-0 opacity-0'}`}>
                    <LocationSearchPanel />
                </div>
            </div>
        </div>
    );
};

export default Home;
