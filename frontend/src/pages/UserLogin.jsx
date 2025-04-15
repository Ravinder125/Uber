import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { loginUser } from '../services/user.service';
import Input from '../components/Input';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        telCode: '',
        tel: '',
        password: ''
    });

    const { user, setUser } = useContext(userDataContext);

    const navigate = useNavigate()
    const [loginMethod, setLoginMethod] = useState('email');
    const [errors, setErrors] = useState({});

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
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const toggleLoginMethod = () => {
        setLoginMethod(prev => prev === 'email' ? 'tel' : 'email');
        setFormData(prev => ({ ...prev, email: '', telCode: '', tel: '' }));
    };

    const resetForm = () => {
        setFormData({
            email: '',
            telCode: '',
            tel: '',
            password: ''
        });
        setErrors({});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = loginMethod === 'email'
            ? { email: formData.email.trim(), password: formData.password }
            : { telCode: formData.telCode || '+91', tel: formData.tel.trim(), password: formData.password };

        try {
            const response = await loginUser(finalData);

            if (response.status === 200) {
                const { token, user } = response.data.data;
                localStorage.setItem('user-token', token);
                setUser(user);
                console.log('User successfully logged in:', user);

                // Redirecting to home page after successful login
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            alert(errorMessage);
            // setErrors(prev => ({ ...prev, submit: errorMessage }));
        } finally {
            resetForm();
        }
    };

    return (
        <div className='p-6 h-screen flex items-center justify-center'>
            <div className="p-6 w-96 flex sm:bg-gray-100 justify-center gap-10 flex-col ">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className='w-18 self-center'
                />
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                    <div
                        className="text-gray-500 underline w-fit cursor-pointer"
                        onClick={toggleLoginMethod}
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
                        <div className="flex gap-1 justify-center items-center">
                            <select
                                name="country"
                                className=" bg-gray-100 border border-gray-300 rounded-sm text-center h p-3 "
                                value={formData.telCode}
                                onChange={handleInputChange}
                                required
                            >
                                {Object.keys(telephoneCodes).map((flag) => (
                                    <option key={flag} value={telephoneCodes[flag]}>{flag} {telephoneCodes[flag]}</option>
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
                    )}
                    {/* Password Sectin */}
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
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-black text-white w-full py-2 rounded-sm self-center font-bold"
                    >
                        Login
                    </button>
                    {/* Register Link */}
                    <Link to='/register' className='text-center text-sm'>
                        New here ?
                        <span className='text-blue-500'> Create new Account</span>
                    </Link>
                </form>
                {/* Captain Login */}
                <Link
                    to='/captain-login'
                    className='bg-green-700 text-white text-xl w-full text-center  py-2 rounded-lg font-bold'
                >Login as Captain</Link>
            </div >
        </div >
    );
};

export default UserLogin;