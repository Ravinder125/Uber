import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [FormData, setFormData] = useState({})
    const [phoneCode, setPhoneCode] = useState('+91'); // Default value for better UX
    const [toggle, setToggle] = useState('number'); // Use consistent casing for setToggle
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const toggleEmailToNumber = () => {
        setToggle(prev => prev === 'number' ? 'email' : 'number');
        toggle === 'number' ? setPhoneNumber('') : setEmail('')
        console.log({ email, password, phoneCode, phoneNumber })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setFormData({ phoneNumber: phoneCode + phoneNumber, password })
        } else {
            setFormData({ email, password })

        }

        console.log(FormData)
        console.log('Form submitted');

        setEmail('')
        setPhoneNumber('')
        setPhoneCode('')
        setPassword('')
    };

    return (
        <div>
            <div className="p-6 h-screen flex gap-10 flex-col ">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className='w-18'
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div
                        className="text-gray-500 underline w-fit cursor-pointer"
                        onClick={toggleEmailToNumber}
                    >
                        Login with {toggle === 'email' ? 'number' : 'email'}?
                    </div>
                    <label htmlFor="contact" className="font-semibold text-lg">
                        Enter your {toggle === 'email' ? 'email' : 'phone number'}
                    </label>
                    {toggle === 'email' ? (
                        <div className="flex gap-3 justify-center">
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    ) : (
                        <div className="flex gap-3 justify-center">
                            <select
                                name="country"
                                className="w-22 bg-gray-200 rounded-sm text-center"
                                value={phoneCode}
                                onChange={e => setPhoneCode(e.target.value)} // Use onChange instead of onClick
                                required
                            >
                                <option value={phoneCodes['🇮🇳']}>🇮🇳 {phoneCodes['🇮🇳']}</option>
                                <option value={phoneCodes['🇬🇧']}>🇬🇧 {phoneCodes['🇬🇧']}</option>
                                <option value={phoneCodes['🇺🇸']}>🇺🇸 {phoneCodes['🇺🇸']}</option>
                                <option value={phoneCodes['🇦🇺']}>🇦🇺 {phoneCodes['🇦🇺']}</option>
                            </select>
                            <input
                                type="tel"
                                name="tel"
                                placeholder="123-456-7890"
                                className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div
                        className='flex flex-col gap-2'>
                        <label htmlFor="password" className="font-semibold text-lg">Enter your password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required

                        />
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
                    className='mt-48 bg-green-700 text-white text-xl w-full text-center  py-2 rounded-lg font-bold'
                >Login as Captain</Link>
            </div>
        </div>
    );
};

export default UserLogin;