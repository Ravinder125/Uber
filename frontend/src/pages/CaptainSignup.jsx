import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        phoneNumber: '',
        password: '',
        vehicle: {
            color: '',
            plate: '',
            type: 'car',
            capacity: 4
        },
        status: 'active',
        location: {
            lat: '',
            lng: ''
        }
    });
    const [phoneCode, setPhoneCode] = useState('+91');
    const [errors, setErrors] = useState({});

    // ...existing phoneCodes object...

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('vehicle.')) {
            const vehicleField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                vehicle: {
                    ...prev.vehicle,
                    [vehicleField]: value
                }
            }));
        } else if (name.includes('name')) {
            setFormData(prev => ({
                ...prev,
                fullname: {
                    ...prev.fullname,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // ...add validateEmail function from UserSignup...

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add validation and API call
        console.log('Captain Signup Data:', {
            ...formData,
            phoneNumber: phoneCode + formData.phoneNumber
        });
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col rounded-sm gap-10">
                <img src="./uber-logo.png" alt="uber-logo" className='w-18' />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email, Name, Phone inputs similar to UserSignup */}
                    {/* ...existing input fields... */}

                    {/* Vehicle Information */}
                    <div className='flex flex-col gap-2'>
                        <label className="font-semibold text-lg">Vehicle Details</label>
                        <input
                            type="text"
                            name="vehicle.color"
                            placeholder="Vehicle Color"
                            value={formData.vehicle.color}
                            onChange={handleInputChange}
                            className="bg-gray-200 rounded-sm p-2"
                            required
                        />
                        <input
                            type="text"
                            name="vehicle.plate"
                            placeholder="Vehicle Plate Number"
                            value={formData.vehicle.plate}
                            onChange={handleInputChange}
                            className="bg-gray-200 rounded-sm p-2"
                            required
                        />
                        <select
                            name="vehicle.type"
                            value={formData.vehicle.type}
                            onChange={handleInputChange}
                            className="bg-gray-200 rounded-sm p-2"
                            required
                        >
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="auto">Auto</option>
                            <option value="van">Van</option>
                        </select>
                    </div>

                    {/* Password field similar to UserSignup */}
                    {/* ...existing password field... */}

                    <button type="submit" className="bg-black text-white py-2 rounded-sm font-bold">
                        Register as Captain
                    </button>

                    <Link to='/captain-login' className='text-center text-sm'>
                        Already a captain? <span className='text-blue-500'>Login here</span>
                    </Link>
                </form>

                <Link
                    to='/signup'
                    className='bg-green-700 text-white text-xl w-full text-center py-2 rounded-lg font-bold'
                >
                    Register as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainSignup;