import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, Meta, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';


const UserSignup = () => {
    const userData = useContext(userContext);
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

        console.log('Form submitted:', formData);

        const username = generateUsername(formData.fullname.firstname);

        if (username) {
            const updatedFormData = { ...formData, username, telCode: formData.telCode ? formData.telCode : '+91' };

            setFormData(updatedFormData);

            console.log('Updated Form Data:', updatedFormData);
            /*|| 'http://localhost:3000/api/v1'*/
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, updatedFormData)
                const { data } = response.data;
                console.log(data)
                console.log(response)
                navigate('/login')
            } catch (error) {
                console.log('Error:', error)
                setErrors(prev => ({ ...prev, submit: error?.response?.data?.message }))

            } finally {
                resetForm();
            }
        }
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="p-6 w-96 sm:bg-gray-100 flex flex-col rounded-sm gap-10 justify-center items-center">
                <img src="./uber-logo.png" alt="uber-logo-captain" className='w-18' />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {/* Email Section */}
                    <div className='flex flex-col gap-2'>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email - example@gmail.com"
                            className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                            value={formData.email}
                            required
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className='text-red-600 text-sm'>{errors.email}</div>}
                    </div>

                    {/* Name Section */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            {['firstname', 'middlename', 'lastname'].map((name) => (
                                <input
                                    key={name}
                                    type="text"
                                    name={name}
                                    placeholder={name}
                                    className="bg-gray-200 rounded-sm p-2 w-1/3"
                                    value={formData.fullname[name]}
                                    required={name !== 'middlename'}  // Middle name is optional
                                    onChange={handleInputChange}
                                />
                            ))}
                        </div>
                        <>
                            {errors.firstname && <div className='text-red-600 text-sm'>{errors.firstname}</div>}
                            {errors.lastname && <div className='text-red-600 text-sm'>{errors.lastname}</div>}
                        </>
                    </div>

                    {/* Phone Section */}

                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2">
                            <select
                                name="telCode"
                                className="bg-gray-200 p-2 rounded-sm text-center "
                                value={formData.telCode}
                                onChange={handleInputChange}
                                required
                            >
                                {Object.keys(telephoneCodes).map((flag) => (
                                    <option key={flag} value={telephoneCodes[flag]}>
                                        {flag} {telephoneCodes[flag]}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="tel"
                                placeholder="Enter your tel. number - 123-456-7890"
                                className="bg-gray-200 rounded-sm p-2 placeholder:text-gray-800 w-9/12"
                                value={formData.tel}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {errors.tel && <div className='text-red-600 text-sm'>{errors.tel}</div>}
                    </div>
                    {/* Password Section */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password - paglu123@"
                        className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <div className='text-red-600 text-sm'>{errors.password}</div>}

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
                    to='/captain-signup'
                    className='bg-green-700 text-white text-xl text-center py-2 rounded-lg font-bold w-full'>
                    Signup as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserSignup;
