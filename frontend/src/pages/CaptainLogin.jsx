import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [FormData, setFormData] = useState({
        email: '',
        telCode: '',
        tel: '',
        password: ''
    });
    const [loginMethod, setLoginMethod] = useState('email');
    const [errors, setErrors] = useState({});

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const resetForm = () => {
        setFormData({ email: '', telCode: '', tel: '', password: '' });
        setErrors({});
    }
    const loginMethodEmailToNumber = () => {
        setLoginMethod(prev => prev === 'number' ? 'email' : 'number');
    };

    const validationField = (name, value) => {
        if (!value?.trim()) return '';
        switch (name) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email';
            case 'password':
                return value.length >= 8 ? '' : 'Password must be at least 8 characters long';
            case 'tel':
                return /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits long';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validationField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = loginMethod === 'email'
            ? { email: FormData.email, password: FormData.password }
            : { phoneNumber: FormData.telCode + FormData.tel, password: FormData.password };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, loginData);
            console.log('Captain logged in successfully:', response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Login failed';
            console.log('Error:', error)
            setErrors({ submit: errorMessage });
        } finally {
            resetForm();
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col gap-10">
                {/* Logo */}
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className="w-18 self-center"
                />

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Toggle Login Method */}
                    <div
                        className="text-gray-500 underline cursor-pointer self-start"
                        onClick={loginMethodEmailToNumber}
                    >
                        Login with {loginMethod === 'email' ? 'phone number' : 'email'}?
                    </div>

                    {/* Email or Phone Input */}
                    {loginMethod === 'email' ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email - example@gmail.com"
                                className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                                value={FormData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3">
                                <select
                                    name="telCode"
                                    className="w-22 bg-gray-200 rounded-sm text-center"
                                    value={FormData.telCode}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {Object.entries(phoneCodes).map(([flag, code]) => (
                                        <option key={code} value={code}>
                                            {flag} {code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="tel"
                                    placeholder="Enter your number - 123-456-7890"
                                    className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
                                    value={FormData.tel}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {errors.tel && (
                                <div className="text-red-500 text-sm">{errors.tel}</div>
                            )}
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password - paglu123@"
                            className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                            value={FormData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">{errors.password}</div>
                        )}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="text-red-500 text-sm">{errors.submit}</div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-black text-white w-full py-2 rounded-sm font-bold"
                    >
                        Login
                    </button>

                    {/* Signup Link */}
                    <Link to="/captain-signup" className="text-center text-sm">
                        New here?{" "}
                        <span className="text-blue-500">Create new Account</span>
                    </Link>
                </form>

                {/* User Login Link */}
                <Link
                    to="/login"
                    className="bg-green-700 text-white text-xl w-full text-center py-2 rounded-lg font-bold"
                >
                    Login as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
