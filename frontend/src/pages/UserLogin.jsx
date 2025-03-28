import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [loginMethod, setLoginMethod] = useState('email');
    const [phoneCode, setPhoneCode] = useState('+91');
    const [errors, setErrors] = useState({});

    const phoneCodes = {
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
            case 'phoneNumber':
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
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const toggleLoginMethod = () => {
        setLoginMethod(prev => prev === 'email' ? 'phoneNumber' : 'email');
        setFormData(prev => ({
            ...prev,
            email: '',
            phoneNumber: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) validationErrors[field] = error;
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const finalData = loginMethod === 'email'
            ? { email: formData.email, password: formData.password }
            : { phoneNumber: phoneCode + formData.phoneNumber, password: formData.password };

        console.log(finalData);
        console.log('Form submitted');

        setFormData({
            email: '',
            phoneNumber: '',
            password: ''
        });
        setPhoneCode('+91');
        setErrors({});
    };

    return (
        <div className='p-6 h-screen flex items-center justify-center'>
            <div className="p-6 w-96 flex sm:bg-gray-100 justify-center gap-10 flex-col ">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className='w-18 self-center'
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div
                        className="text-gray-500 underline w-fit cursor-pointer"
                        onClick={toggleLoginMethod}
                    >
                        Login with {loginMethod === 'email' ? 'phone number' : 'email'}?
                    </div>
                    {loginMethod === 'email' ? (
                        <div className="flex gap-3 justify-center">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email - example@gmail.com"
                                className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && <span className="text-red-500">{errors.email}</span>}
                        </div>
                    ) : (
                        <div className="flex gap-3 justify-center">
                            <select
                                name="country"
                                className="w-22 bg-gray-200 rounded-sm text-center"
                                value={phoneCode}
                                onChange={e => setPhoneCode(e.target.value)}
                                required
                            >
                                {Object.keys(phoneCodes).map((flag) => (
                                    <option key={flag} value={phoneCodes[flag]}>{flag} {phoneCodes[flag]}</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Enter your number - 123-456-7890"
                                className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
                        </div>
                    )}
                    <div className='flex flex-col gap-2'>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password - paglu123@"
                            className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white w-full py-2 rounded-sm self-center font-bold"
                    >
                        Login
                    </button>
                    <Link to='/signup' className='text-center text-sm'>
                        New here ?
                        <span className='text-blue-500'> Create new Account</span>
                    </Link>
                </form>
                <Link
                    to='/captain-login'
                    className='bg-green-700 text-white text-xl w-full text-center  py-2 rounded-lg font-bold'
                >Login as Captain</Link>
            </div>
        </div>
    );
};

export default UserLogin;