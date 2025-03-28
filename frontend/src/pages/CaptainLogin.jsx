import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [FormData, setFormData] = useState({})
    const [toggle, setToggle] = useState('number'); // Use consistent casing for setToggle

    const [email, setEmail] = useState('')
    const [phoneCode, setPhoneCode] = useState('+91'); // Default value for better UX
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = toggle === 'email'
            ? { email, password }
            : { phoneNumber: phoneCode + phoneNumber, password };
        setFormData(loginData);
        console.log(FormData)
        try {
            // Add captain login API call here
            console.log('Captain Login Data:', loginData);
        } catch (error) {
            setErrors({ submit: error.message });
        }
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="p-6 w-96 justify-center sm:bg-gray-100 flex gap-10 flex-col ">
                <img
                    src="./uber-logo.png"
                    alt="uber-logo-captain"
                    className='w-18 self-center'
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div
                        className="text-gray-500 underline w-fit cursor-pointer"
                        onClick={toggleEmailToNumber}
                    >
                        Login with {toggle === 'email' ? 'number' : 'email'} ?
                    </div>
                    {/* <label htmlFor="contact" className="font-semibold text-lg">
                        Enter your {toggle === 'email' ? 'email' : 'phone number'}
                    </label> */}
                    {toggle === 'email' ? (
                        <div className="flex gap-3 justify-center">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email - example@gmail.com"
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
                                {Object.keys(phoneCodes).map((flag) => (
                                    <option value={phoneCodes[flag]}>{flag} {phoneCodes[flag]}</option>

                                ))}
                            </select>
                            <input
                                type="tel"
                                name="tel"
                                placeholder="Enter your number - 123-456-7890"
                                className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div
                        className='flex flex-col gap-2'>
                        {/* <label htmlFor="password" className="font-semibold text-lg">Enter your password</label> */}
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password - paglu123@"
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
                    <Link to='/captain-signup' className='text-center text-sm'>
                        New here ?
                        <span className='text-blue-500'> Create new Account</span>
                    </Link>
                </form>
                <Link
                    to='/login'
                    className='bg-green-700 text-white text-xl w-full text-center  py-2 rounded-lg font-bold'
                >Login as User</Link>
            </div>
        </div>
    );
};

export default CaptainLogin;