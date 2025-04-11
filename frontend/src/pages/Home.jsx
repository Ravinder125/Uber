import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            pickup,
            destination
        }
    }

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%'
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%'
            })
        }

    }, [panelOpen])
    return (
        <div className=''>
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
                className={'absolute bg-white bottom-0 w-full p-6 transition-transform duration-500 ease-in-out transform'}
            >
                <div className='h-[30%]'>
                    <h1 className='text-2xl font-bold mb-3'>Find a trip</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col  gap-3'>
                        <input
                            type="text"
                            name="pickup"
                            placeholder='Add a pickup-location'
                            required
                            className='w-full text-center bg-gray-200 p-2 border border-gray-300 rounded'
                            value={pickup}
                            onChange={(e => setPickup(e.target.value))}
                            onClick={() => setPanelOpen(true)}
                        />
                        <input
                            type="text"
                            name="destination"
                            placeholder='Enter your destination'
                            required
                            className='w-full text-center bg-gray-200 p-2 border border-gray-300 rounded placeholder:text-gray-800'
                            value={destination}
                            onChange={(e => setDestination(e.target.value))}
                        />
                        <div className="line absolute w-1 h-18 left-8 top-20 bg-black rounded-full "></div>
                    </form>
                </div>
                <div ref={panelRef} className='h-[70%] bg-red-500'>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Home