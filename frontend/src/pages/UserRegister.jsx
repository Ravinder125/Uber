import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { registerUser } from '../services/user.service';
import Input from '../components/Input';


const UserSignup = () => {
    const { user, setUser } = useContext(userDataContext);
    // console.log(userData)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        telCode: '',
        tel: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
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
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        if (['firstname', 'middlename', 'lastname'].includes(name)) {
            setFormData(prev => ({ ...prev, fullname: { ...prev.fullname, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Validate field
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const generateUsername = (firstname) => {
        if (!firstname) return null;

        const random = Math.floor(1000 + Math.random() * 9000);
        return `${firstname.toLowerCase()}${random}`;
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            fullname: {
                firstname: '',
                middlename: '',
                lastname: ''
            },
            telCode: '',
            tel: '',
            password: ''
        });

        // Clear all errors on form reset
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = generateUsername(formData.fullname.firstname);

        if (!username) {
            alert('Failed to generate a username. Please try again.');
            return;
        }

        const updatedFormData = {
            ...formData,
            username,
            telCode: formData.telCode || '+91', // Default to '+91' if no telCode is selected
        };

        try {
            setFormData(updatedFormData);
            const response = await registerUser(updatedFormData);
            if (response.status === 201) {
                const { token, user } = response.data.data;
                localStorage.setItem('user-token', token);
                setUser(user);
                console.log('User successfully registered:', user);

                // Redirect to login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during registration';
            console.error('Error:', error.response?.data?.error || error);
            alert(errorMessage);
        } finally {
            resetForm();
        }
    };
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col rounded-sm gap-10 justify-center items-center">
                <img src="./uber-logo.png" alt="uber-logo-captain" className='w-18' />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {/* Name input */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2'>
                            {['firstname', 'middlename', 'lastname'].map((name) => (
                                <Input
                                    key={name}
                                    type="text"
                                    name={name}
                                    placeholder={name}
                                    className="bg-gray-200 rounded-sm p-2 w-1/3"
                                    value={formData.fullname[name]}
                                    required={name !== 'middlename' ? true : false}  // Middle name is optional
                                    onChange={handleInputChange}
                                    error={errors[name]}
                                />
                            ))}
                        </div>
                        <>
                            {errors.firstname && <div className='text-red-600 text-sm'>{errors.firstname}</div>}
                            {errors.lastname && <div className='text-red-600 text-sm'>{errors.lastname}</div>}
                        </>
                    </div>
                    {/* Email input */}
                    <Input
                        label='Email'
                        type='email'
                        name='email'
                        placeholder='Enter your Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />


                    {/* Phone input */}

                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2">
                            <select
                                name="country"
                                className="border border-gray-300 rounded-sm text-center p-2 "
                                value={formData.telCode}
                                onChange={handleInputChange}
                                required
                            >
                                {Object.entries(telephoneCodes).map(([flag, code]) => (
                                    <option key={flag} value={code}>
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
                        {errors.tel && <div className='text-red-600 text-sm'>{errors.tel}</div>}
                    </div>
                    {/* Password input */}
                    <Input
                        label='Password'
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded-sm font-bold w-full">
                        Signup
                    </button>

                    <Link to='/login' className='text-center text-sm'>
                        Already have an account? <span className='text-blue-500'>Login here</span>
                    </Link>
                </form>

                <Link
                    to='/captain-register'
                    className='bg-green-700 text-white text-xl text-center py-2 rounded-lg font-bold w-full'>
                    Signup as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserSignup;
