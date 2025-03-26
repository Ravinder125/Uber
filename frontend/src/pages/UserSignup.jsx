import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        tel: '',
        password: ''
    });

    const [phoneCode, setPhoneCode] = useState('+91');
    const [errors, setErrors] = useState({});

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (['firstname', 'middlename', 'lastname'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                fullname: {
                    ...prev.fullname,
                    [name]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear the error if the field is cleared
        if (value === '') {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
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
            tel: '',
            password: ''
        });

        // Clear all errors on form reset
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);

        const username = generateUsername(formData.fullname.firstname);

        if (username) {
            const updatedFormData = {
                ...formData,
                username,
                tel: `${phoneCode}${formData.tel}`
            };

            setFormData(updatedFormData);

            console.log('Updated Form Data:', updatedFormData);

            setTimeout(() => {
                resetForm();
            }, 0);
        }
    };

    const validateForm = (e) => {
        const { name, value } = e.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = { ...errors };

        // Clear the error if the field is empty
        if (!value.trim()) {
            newErrors[name] = '';
        } else {
            switch (name) {
                case 'email':
                    newErrors.email = !emailRegex.test(value) ? 'Please enter a valid email' : '';
                    break;
                case 'firstname':
                    newErrors.firstname = value.length < 3 ? 'First name must be at least 3 characters long' : '';
                    break;
                case 'middlename':
                    newErrors.middlename = value.length < 3 ? 'Middle name must be at least 3 characters long' : '';
                    break;
                case 'lastname':
                    newErrors.lastname = value.length < 3 ? 'Last name must be at least 3 characters long' : '';
                    break;
                case 'tel':
                    newErrors.tel = !/^\d{10}$/.test(value) ? 'Phone number must be 10 digits long' : '';
                    break;
                case 'password':
                    newErrors.password = value.length < 8 ? 'Password must be at least 8 characters long' : '';
                    break;
                default:
                    break;
            }
        }

        setErrors(newErrors);
    };

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
                            onBlur={validateForm}
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
                                    onBlur={validateForm}
                                />
                            ))}
                        </div>
                        <>
                            {errors.firstname && <div className='text-red-600 text-sm'>{errors.firstname}</div>}
                            {errors.middlename && <div className='text-red-600 text-sm'>{errors.middlename}</div>}
                            {errors.lastname && <div className='text-red-600 text-sm'>{errors.lastname}</div>}
                        </>
                    </div>

                    {/* Phone Section */}
                    <div className="flex gap-2">
                        <select
                            name="country"
                            className="bg-gray-200 p-2 rounded-sm text-center "
                            value={phoneCode}
                            onChange={(e) => setPhoneCode(e.target.value)}
                            required
                        >
                            {Object.keys(phoneCodes).map((flag) => (
                                <option key={flag} value={phoneCodes[flag]}>
                                    {flag} {phoneCodes[flag]}
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
                            onBlur={validateForm}
                            required
                        />
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
                        onBlur={validateForm}
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
