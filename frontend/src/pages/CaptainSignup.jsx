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

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const validateForm = (e) => {
        const newErrors = {};
        const { name, value } = e.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value?.trim()) {
            switch (name) {
                case 'email':
                    if (!emailRegex.test(value)) {
                        newErrors.email = 'Please enter a valid email';
                    }
                    break;
                case 'firstname':
                    if (value.length < 3) {
                        newErrors.firstname = 'First name must be at least 3 characters';
                    }
                    break;
                case 'lastname':
                    if (value.length < 3) {
                        newErrors.lastname = 'Last name must be at least 3 characters';
                    }
                    break;
                case 'phoneNumber':
                    if (value.length !== 10) {
                        newErrors.phoneNumber = 'Phone number must be 10 digits';
                    }
                    break;
                case 'password':
                    if (value.length < 8) {
                        newErrors.password = 'Password must be at least 8 characters';
                    }
                    break;
                case 'vehicle.color':
                    if (value.length < 3) {
                        newErrors.vehicleColor = 'Color must be at least 3 characters';
                    }
                    break;
                case 'vehicle.plate':
                    if (value.length < 3) {
                        newErrors.vehiclePlate = 'Plate number must be at least 3 characters';
                    }
                    break;
                default:
                    break;
            }
            setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('vehicle.')) {
            const [, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                vehicle: {
                    ...prev.vehicle,
                    [field]: value
                }
            }));
        } else if (['firstname', 'middlename', 'lastname'].includes(name)) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm(e)) {
            return;
        }

        const submitData = {
            ...formData,
            phoneNumber: phoneCode + formData.phoneNumber
        };

        try {
            const response = await fetch('/api/v1/captains/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Handle successful registration
            console.log('Registration successful', data);

        } catch (error) {
            setErrors(prev => ({ ...prev, submit: error.message }));
        }
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col rounded-sm gap-10">
                <img src="./uber-logo.png" alt="uber-logo" className='w-18' />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Personal Details Section */}
                    <div className='flex flex-col gap-2'>
                        <label className="font-semibold text-lg">Personal Details</label>

                        {/* Name inputs */}
                        <div className='flex gap-2'>
                            {['firstname', 'middlename', 'lastname'].map(field => (
                                <input
                                    key={field}
                                    type="text"
                                    name={field}
                                    placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    value={formData.fullname[field]}
                                    onChange={handleInputChange}
                                    onBlur={validateForm}
                                    className='bg-gray-200 p-2 rounded-sm w-1/2'
                                    required={field !== 'middlename'}
                                />
                            ))}
                        </div>
                        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
                        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}

                        {/* Email input */}
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={validateForm}
                            className='bg-gray-200 p-2 rounded-sm'
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                        {/* Phone input */}
                        <div className='flex gap-2'>
                            <select
                                value={phoneCode}
                                onChange={(e) => setPhoneCode(e.target.value)}
                                className='bg-gray-200 p-2 rounded-sm w-1/4'
                            >
                                {Object.entries(phoneCodes).map(([flag, code]) => (
                                    <option key={code} value={code}>
                                        {flag} {code}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder='Phone number'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                onBlur={validateForm}
                                className='bg-gray-200 p-2 rounded-sm w-9/12'
                                required
                            />
                        </div>
                        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}

                        {/* Password input */}
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={validateForm}
                            className='bg-gray-200 p-2 rounded-sm'
                            required
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    {/* Vehicle Details Section */}
                    <div className='flex flex-col gap-2'>
                        <label className="font-semibold text-lg">Vehicle Details</label>
                        <input
                            type="text"
                            name="vehicle.color"
                            placeholder="Vehicle Color"
                            value={formData.vehicle.color}
                            onChange={handleInputChange}
                            onBlur={validateForm}
                            className='bg-gray-200 p-2 rounded-sm'
                            required
                        />
                        {errors.vehicleColor && <span className="text-red-500 text-sm">{errors.vehicleColor}</span>}

                        <input
                            type="text"
                            name="vehicle.plate"
                            placeholder="Vehicle Plate Number"
                            value={formData.vehicle.plate}
                            onChange={handleInputChange}
                            onBlur={validateForm}
                            className='bg-gray-200 p-2 rounded-sm'
                            required
                        />
                        {errors.vehiclePlate && <span className="text-red-500 text-sm">{errors.vehiclePlate}</span>}

                        <select
                            name="vehicle.type"
                            value={formData.vehicle.type}
                            onChange={handleInputChange}
                            onBlur={validateForm}
                            className='bg-gray-200 p-2 rounded-sm'
                            required
                        >
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="auto">Auto</option>
                            <option value="van">Van</option>
                        </select>
                    </div>

                    {errors.submit && (
                        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                    )}

                    <button type="submit" className="bg-black text-white py-2 rounded-sm font-bold">
                        Register as Captain
                    </button>

                    <Link to='/captain-login' className='text-center text-sm'>
                        Already a captain? <span className='text-blue-500'>Login here</span>
                    </Link>
                </form>

                <Link to='/signup' className='bg-green-700 text-white text-xl w-full text-center py-2 rounded-lg font-bold'>
                    Register as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainSignup;