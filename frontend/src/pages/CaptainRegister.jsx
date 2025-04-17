import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerCaptain } from '../services/captain.service';
import Input from '../components/Input';

const CaptainRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        telCode: '',
        tel: '',
        password: '',
        vehicle: {
            color: '',
            plate: '',
            type: 'car',
            capacity: 4
        },
        status: 'active',
        location: {
            latitude: null,
            longitude: null
        }
    });

    const [errors, setErrors] = useState({
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        tel: '',
        password: '',
        vehicle: {
            color: '',
            plate: '',
        },
    });
    const navigate = useNavigate();
    const telephoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const validateField = (name, value) => {
        if (!value?.trim()) return '';

        switch (name) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ''
                    : 'Please enter a valid email';
            case 'password':
                return value.length >= 8
                    ? ''
                    : 'Password must be at least 8 characters';
            case 'tel':
                return /^\d{10}$/.test(value)
                    ? ''
                    : 'Phone number must be 10 digits';
            case 'firstname':
            case 'lastname':
                return value.length >= 3
                    ? ''
                    : `${name} must be at least 3 characters`;
            case 'vehicle.color':
            case 'vehicle.plate':
                return value.length >= 3
                    ? ''
                    : `${name.split('.')[1]} must be at least 3 characters`;
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        if (name.includes('vehicle.')) {
            // No operation needed here
            const [, field] = name.split('.');
            setFormData(prev => ({ ...prev, vehicle: { ...prev.vehicle, [field]: isNaN(parseInt(value)) ? value : parseInt(value) } }));

        } else if (['firstname', 'middlename', 'lastname'].includes(name)) {
            setFormData(prev => ({ ...prev, fullname: { ...prev.fullname, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Validate field

        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const resetForm = () => {
        setFormData({
            email: '',
            fullname: {
                firstname: '',
                middlename: '',
                lastname: ''
            },
            tel: '',
            telCode: '',
            password: '',
            vehicle: {
                color: '',
                plate: '',
                type: 'car',
                capacity: 4
            },
            status: 'active',
            location: {
                latitude: null,
                longitude: null
            }
        })
        setErrors({
            email: '',
            fullname: {
                firstname: '',
                middlename: '',
                lastname: ''
            },
            tel: '',
            password: '',
            vehicle: {
                color: '',
                plate: '',
            },
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = { ...formData, telCode: !formData.telCode ? '+91' : formData.telCode, };
        console.log(submitData);

        try {
            const { token, newCaptain } = await registerCaptain(submitData);
            localStorage.setItem('captain-token', token);
            console.log('Captain registered successfully:', newCaptain);
            alert('Captain registered successfully');

            navigate('/captain-login');
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || "An error occurred";
            alert(errorMessage);

            // setErrors(prev => ({ ...prev, submit: error.response.data?.message }));
        } finally {
            resetForm();
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
                <img src="./uber-logo.png" alt="uber-logo" className="w-24 mx-auto" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Personal Details */}
                    <div className="flex flex-col gap-3">
                        <label className="text-lg font-semibold">Personal Details</label>

                        {/* Full Name */}
                        <div className="flex gap-2">
                            {['firstname', 'middlename', 'lastname'].map((name) => (
                                <Input
                                    key={name}
                                    type="text"
                                    name={name}
                                    placeholder={name}
                                    className="w-1/3 p-2 rounded-md bg-gray-100"
                                    value={formData.fullname[name]}
                                    required={name !== 'middlename'}
                                    onChange={handleInputChange}
                                    error={errors[name]}
                                />
                            ))}
                        </div>
                        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
                        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}

                        {/* Email */}
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />

                        {/* Phone */}
                        <div className="flex gap-2">
                            <select
                                name="telCode"
                                value={formData.telCode}
                                onChange={handleInputChange}
                                className="w-1/3 p-2 rounded-md bg-gray-100 border border-gray-300"
                            >
                                {Object.entries(telephoneCodes).map(([flag, code]) => (
                                    <option key={code} value={code}>
                                        {flag} {code}
                                    </option>
                                ))}
                            </select>
                            <Input
                                label="Phone"
                                type="tel"
                                name="tel"
                                placeholder="Enter your phone"
                                value={formData.tel}
                                onChange={handleInputChange}
                                error={errors.tel}
                            />
                        </div>
                        {errors.tel && <span className="text-red-500 text-sm">{errors.tel}</span>}

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                    </div>

                    {/* Vehicle Details */}
                    <div className="flex flex-col gap-3">
                        <label className="text-lg font-semibold">Vehicle Details</label>

                        <Input
                            label="Vehicle Color"
                            type="text"
                            name="vehicle.color"
                            placeholder="Vehicle color"
                            value={formData.vehicle.color}
                            onChange={handleInputChange}
                            error={errors.vehicle.color}
                        />
                        <Input
                            label="Vehicle Plate"
                            type="text"
                            name="vehicle.plate"
                            placeholder="Vehicle plate"
                            value={formData.vehicle.plate}
                            onChange={handleInputChange}
                            error={errors.vehicle.plate}
                        />
                        <select
                            name="vehicle.type"
                            value={formData.vehicle.type}
                            onChange={handleInputChange}
                            className="p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700"
                            required
                        >
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="auto">Auto</option>
                            <option value="van">Van</option>
                        </select>
                    </div>

                    {errors.submit && <div className="text-red-500 text-center text-sm">{errors.submit}</div>}

                    {/* Submit & Link */}
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition">
                            Register as Captain
                        </button>

                        <Link to="/captain-login" className="text-center text-sm text-blue-600 hover:underline">
                            Already a captain? <span className="font-medium">Login here</span>
                        </Link>
                    </div>
                </form>

                {/* Register as User */}
                <Link
                    to="/register"
                    className="mt-4 bg-green-600 text-white text-center py-2 rounded-md font-bold hover:bg-green-700 transition"
                >
                    Register as User
                </Link>
            </div>
        </div>
    );

};

export default CaptainRegister;