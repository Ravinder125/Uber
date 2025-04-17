import axios from 'axios';
import React, { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginCaptain } from '../services/captain.service';
import Loading from '../features/Loading';
import Input from '../components/Input'


const CaptainLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        telCode: '',
        tel: '',
        password: ''
    });
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [loginMethod, setLoginMethod] = useState('email');
    const [isLoading, setIsLoading] = useState(false);
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
            ? { email: formData.email, password: formData.password }
            : { phoneNumber: formData.telCode + formData.tel, password: formData.password };

        try {
            setIsLoading(true);
            const response = await loginCaptain(loginData)

            if (response.status === 200) {
                const { token, captain } = response.data.data;
                setCaptain(captain);
                console.log(response.data)
                localStorage.setItem('captain-token', token);
                navigate('/captain-home');
            }

        }
        catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            alert(errorMessage);
        } finally {
            resetForm();
            setIsLoading(false);
        }


    }
    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col gap-10">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className="w-18 self-center"
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div
                        className="text-blue-800 font-bold cursor-pointer self-start"
                        onClick={loginMethodEmailToNumber}
                    >
                        Login with {loginMethod === 'email' ? 'phone number' : 'email'}?
                    </div>
                    {loginMethod === 'email' ? (
                        <Input
                            label='Email'
                            type='email'
                            name='email'
                            placeholder='Enter your Email'
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3">
                                <select
                                    name="telCode"
                                    className="w-22 border border-gray-300 rounded-sm text-center shadow-md"
                                    value={formData.telCode}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {Object.entries(phoneCodes).map(([flag, code]) => (
                                        <option key={code} value={code}>
                                            {flag} {code}
                                        </option>
                                    ))}
                                </select>
                                <Input
                                    label='Tel'
                                    type="tel"
                                    name="tel"
                                    placeholder="Enter your number"
                                    value={formData.tel}
                                    onChange={handleInputChange}
                                    error={errors.tel}
                                />
                            </div>
                        </div>
                    )}
                    <Input
                        label='Password'
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div>
                        {errors.submit && <span className="text-red-500 text-base">{errors.submit}</span>}
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