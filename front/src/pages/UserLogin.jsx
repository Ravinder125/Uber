import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [phoneCode, setPhoneCode] = useState('+91'); // Default value for better UX
    const [toggle, setToggle] = useState('number'); // Use consistent casing for setToggle
    const navigate = useNavigate(); // For navigation after form submission

    const phoneCodes = {
        '🇮🇳': '+91',
        '🇬🇧': '+44',
        '🇺🇸': '+1',
        '🇦🇺': '+61',
    };

    const setCode = (e) => {
        setPhoneCode(e.target.value); // Update state with selected value
        console.log(e.target.value); // Log the new value immediately
    };

    const toggleEmailToNumber = () => {
        setToggle(toggle === 'number' ? 'email' : 'number');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Add your login logic here (e.g., API call)
        console.log('Form submitted');
        navigate('/dashboard'); // Navigate programmatically after logic
    };

    return (
        <div className="p-4 h-screen">
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
                            required
                        />
                    </div>
                ) : (
                    <div className="flex gap-3 justify-center">
                        <select
                            name="country"
                            className="w-22 bg-gray-200 rounded-sm text-center"
                            value={phoneCode}
                            onChange={setCode} // Use onChange instead of onClick
                            required
                        >
                            <option value={phoneCodes['🇮🇳']}>🇮🇳 {phoneCodes['🇮🇳']}</option>
                            <option value={phoneCodes['🇬🇧']}>🇬🇧 {phoneCodes['🇬🇧']}</option>
                            <option value={phoneCodes['🇺🇸']}>🇺🇸 {phoneCodes['🇺🇸']}</option>
                            <option value={phoneCodes['🇦🇺']}>🇦🇺 {phoneCodes['🇦🇺']}</option>
                        </select>
                        <input
                            type="number"
                            name="number"
                            placeholder="123-456-7890"
                            className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
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
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white w-full py-2 rounded-sm self-center"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

export default UserLogin;