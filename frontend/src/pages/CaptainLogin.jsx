import axios from 'axios';
import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginCaptain } from '../services/captain.service';

const CaptainLogin = () => {
    const [FormData, setFormData] = useState({
        email: '',
        telCode: '',
        tel: '',
        password: ''
    });
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [loginMethod, setLoginMethod] = useState('email');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const resetForm = () => {
        setFormData({ email: '', telCode: '', tel: '', password: '' });
        setErrors({});
    };

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
            const { token, captain } = await loginCaptain(loginData);
            setCaptain(captain);
            localStorage.setItem('captain-token', token);
            navigate('/captain-home');
        } catch (error) {
            console.log('Error:', error.response?.data?.message || error);
        } finally {
            resetForm();
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col gap-10">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className="w-18 self-center"
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div
                        className="text-gray-500 underline cursor-pointer self-start"
                        onClick={loginMethodEmailToNumber}
                    >
                        Login with {loginMethod === 'email' ? 'phone number' : 'email'}?
                    </div>
                    {loginMethod === 'email' ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="bg-gray-200 rounded-sm p-2 w-full"
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
                                    placeholder="Enter your number"
                                    className="bg-gray-200 w-72 rounded-sm p-2"
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
                    <div className="flex flex-col gap-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="bg-gray-200 rounded-sm p-2 w-full"
                            value={FormData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">{errors.password}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white w-full py-2 rounded-sm font-bold"
                    >
                        Login
                    </button>
                    <Link to="/captain-register" className="text-center text-sm">
                        New here? <span className="text-blue-500">Create new Account</span>
                    </Link>
                </form>
                <Link
                    to='/login'
                    className="bg-green-700 text-white text-xl w-full text-center py-2 rounded-lg font-bold"
                >
                    Login as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;