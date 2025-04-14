import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ComfirmRide from '../components/ComfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [comfirmRide, setComfirmRide] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            pickup,
            destination
        };

        console.log(data);
    };


    return (
        <div className="relative">
            {/* Logo */}
            <img
                src="./uber-logo.png"
                alt="uber-logo"
                className="w-18 absolute left-5 top-5 z-20"
            />

            {/* Background Map */}
            <div className="h-screen"><img src="./map.gif" alt="map" className="w-full h-full object-cover" /></div>

            {/* Sliding Panel */}
            <div className={`absolute left-0 w-full transition-all duration-500 ease-in-out bg-white p-6 ${panelOpen ? 'top-0 h-screen' : 'top-[68%] h-auto'} z-30`} >
                {/* Header & Form */}
                <div className="transition-all duration-500 ease-in-out">
                    <h5
                        className="hover:bg-gray-200 w-fit rounded-full px-2 py-1 cursor-pointer"
                        onClick={() => {
                            setPanelOpen(!panelOpen)
                            setVehiclePanel(false)
                        }}
                    >
                        <i className={`ri-arrow-${panelOpen ? 'down' : 'up'}-wide-line`}></i>
                    </h5>
                    <h4 className="text-2xl font-bold mb-3">Find a trip</h4>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="pickup"
                            placeholder="Add a pickup location"
                            required
                            className="w-full text-center bg-gray-200 p-2 border border-gray-300 rounded"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        <input
                            type="text"
                            name="destination"
                            placeholder="Enter your destination"
                            required
                            className="w-full text-center bg-gray-200 p-2 border border-gray-300 rounded placeholder:text-gray-800"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        <div
                            className={`absolute left-8 bg-black rounded-full transition-all duration-500 ease-in-out ${panelOpen ? 'h-0 w-0' : 'h-18 w-1 top-28'
                                }`}
                        ></div>
                    </form>
                </div>
                {/* Search Panel */}
                <div className={`overflow-hidden flex justify-center items-center rounded-xl transition-all duration-500 ease-in-out  ${panelOpen ? 'h-[70%] mt-4' : 'h-0'}`}
                >
                    <LocationSearchPanel setVehiclePanel={{ setVehiclePanel }} panel={{ setPanelOpen }} />
                </div>
                <div className={`h-[70%] fixed z-10 bg-white left-0 w-full transition-all duration-500 ease-in-out ${vehiclePanel ? 'bottom-0' : 'bottom-[-70%]'}`}>
                    <VehiclePanel vehicle={{ vehiclePanel, setVehiclePanel }} panel={{ setPanelOpen }} setComfirmRide={{ setComfirmRide }} />
                </div>
                <div className={`fixed z-15 transition-all duration-500 ease-in-out w-full bg-white h-[70%] left-0 ${comfirmRide ? 'bottom-0' : '-bottom-200'}`}  >
                    <ComfirmRide comfirmRide={{ comfirmRide, setComfirmRide }} setVehicleFound={{ setVehicleFound }} />
                </div>
                <div className={`fixed z-15 transition-all duration-500 ease-in-out w-full bg-white h-[75%] left-0 ${vehicleFound ? 'bottom-0' : '-bottom-200'}`}  >
                    <LookingForDriver vehicleFound={{ vehicleFound, setVehicleFound }} setComfirmRide={{ setComfirmRide }} />
                </div>
                <div className={`fixed hidden z-15 bottom-0 transtion-all duration-500 ease-in-out w-full bg-white h-[90%] left-0`}>
                    <WaitingForDriver />
                </div>
            </div>
        </div >
    );
};

export default Home;
