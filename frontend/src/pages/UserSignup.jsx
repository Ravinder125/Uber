import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
    // Consolidate related state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: ''
        },
        phoneNumber: '',
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prev => ({
                ...prev,
                email: 'Please enter a valid email address'
            }));
            return false;
        }
        return true;
    };

    const generateUsername = (firstName) => {
        if (!firstName) return '';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${firstName.toLowerCase()}${randomNum}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('name')) {
            setFormData(prev => ({
                ...prev,
                fullname: {
                    ...prev.fullname,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Validation
        if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const username = generateUsername(formData.fullname.firstname);

        try {
            const response = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    username,
                    phoneNumber: phoneCode + formData.phoneNumber
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Handle successful registration
            console.log('Registration successful', data);
            // Add navigation logic here

        } catch (error) {
            setErrors({ submit: error.message });
        }
    };

    return (
        <div className="p-6 h-screen flex gap-10 flex-col">
            <img src="./uber-logo.png" alt="uber-logo" className="w-18" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-lg">
                        Enter your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-sm p-2 w-full"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                {/* Name Inputs */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold text-lg">
                        Enter your Name
                    </label>
                    <div className='flex gap-1 '>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter your first name"
                            className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
                            value={formData.fullname.firstname}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="middlename"
                            placeholder="Enter your middle name"
                            className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
                            value={formData.fullname.middlename}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter your last name"
                            className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
                            value={formData.fullname.lastname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Phone Inputs */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="contact" className="font-semibold text-lg">Enter your phone number</label>
                    <div className="flex gap-3 justify-center">
                        <select
                            name="country"
                            className="w-22 bg-gray-200 rounded-sm text-center"
                            value={phoneCode}
                            onChange={e => setPhoneCode(e.target.value)}
                            required
                        >
                            <option value={phoneCodes['🇮🇳']}>🇮🇳 {phoneCodes['🇮🇳']}</option>
                            <option value={phoneCodes['🇬🇧']}>🇬🇧 {phoneCodes['🇬🇧']}</option>
                            <option value={phoneCodes['🇺🇸']}>🇺🇸 {phoneCodes['🇺🇸']}</option>
                            <option value={phoneCodes['🇦🇺']}>🇦🇺 {phoneCodes['🇦🇺']}</option>
                        </select>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="123-456-7890"
                            className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-semibold text-lg">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-sm p-2 w-full"
                        required
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>

                {errors.submit && (
                    <div className="text-red-500 text-sm text-center">
                        {errors.submit}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-black text-white w-full py-2 rounded-sm font-bold"
                >
                    Sign Up
                </button>

                <Link to='/login' className='text-center text-sm'>
                    Already have an account?
                    <span className='text-blue-500'> login here</span>
                </Link>
            </form>
            <Link
                to='/captain-signup'
                className='mt-34 bg-green-700 text-white text-xl w-full text-center py-2 rounded-lg font-bold'
            >
                Signup as Captain
            </Link>
        </div>
    );
};

// export default UserSignup;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const UserSignup = () => {

//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [firstName, setFirstName] = useState('')
//     const [middleName, setMiddleName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [phoneCode, setPhoneCode] = useState('+91'); // Default value for better UX
//     const [phoneNumber, setPhoneNumber] = useState('')
//     const [password, setPassword] = useState('')

//     const [error, setError] = useState({})
//     const [FormData, setFormData] = useState({})

//     const phoneCodes = {
//         '🇮🇳': '+91',
//         '🇬🇧': '+44',
//         '🇺🇸': '+1',
//         '🇦🇺': '+61',
//     };

//     // Preventing browser to reload after submission and do empty all fields
//     const handleSubmit = (e) => {
//         console.log({
//             username,
//             email,
//             fullname: {
//                 firstname: firstName,
//                 middlename: middleName,
//                 lastname: lastName
//             },
//             phoneNumber: phoneCode + phoneNumber,
//             password
//         })
//         e.preventDefault()
//         console.log('Form submitted');
//         generateUsername(firstName)

//         setFormData({
//             username,
//             email,
//             fullname: {
//                 firstname: firstName,
//                 middlename: middleName,
//                 lastname: lastName
//             },
//             phoneNumber: phoneCode + phoneNumber,
//             password
//         })

//         console.log(FormData)

//         setEmail('')
//         setPhoneNumber('')
//         setPhoneCode('')
//         setPassword('')
//     };

//     const emailValidator = () => {
//         if (!email.includes(['@', 'com', '.'])) {
//             setError(prev => prev.emaiError = 78)
//             console.log(error)
//         }
//     }

//     // Generating 100 usernames for just a demo of generateUsername function
//     const usernames = Array.from({ length: 100 }, (_, i) => `Ravinder${Math.floor(1000 + Math.random() * 9000)}`);
//     const generateUsername = (firstName) => {
//         console.log(usernames)

//         setUsername(`${firstName}${Math.floor(Math.random() * 1000)}`)
//         console.log(username)

//         if (usernames.find(username)) {
//             generateUsername(firstName)
//         }

//         console.log(username)
//         return username
//     };

//     // generateUsername(firstName);


//     return (
//         <div>
//             <div className="p-6 h-screen flex gap-10 flex-col ">
//                 <img
//                     src="./uber-logo.png"
//                     alt="uber-logo-captain"
//                     className='w-18'
//                 />
//                 <form onSubmit={e => handleSubmit(e)} className="flex flex-col gap-3">
//                     <div
//                         className='flex flex-col gap-2'>
//                         <label htmlFor="contact" className="font-semibold text-lg">
//                             Enter your email
//                         </label>
//                         <div className="flex gap-3 justify-center">
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="example@gmail.com"
//                                 className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 onBlur={emailValidator}
//                                 required
//                             />
//                             <div>{error.emaiError ? error.emaiError : 'nothing'}</div>
//                         </div>
//                     </div>
//                     <div
//                         className='flex flex-col gap-2'>
//                         <label htmlFor="name" className="font-semibold text-lg">
//                             Enter your Name
//                         </label>
//                         <div className='flex gap-1 '>
//                             <input
//                                 type="text"
//                                 name="firstname"
//                                 placeholder="Enter your first name"
//                                 className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
//                                 value={firstName}
//                                 onChange={e => setFirstName(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="middlename"
//                                 placeholder="Enter your middle name"
//                                 className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
//                                 value={middleName}
//                                 onChange={e => setMiddleName(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="lastname"
//                                 placeholder="Enter your last name"
//                                 className="bg-gray-200 w-1/3 rounded-sm p-2 placeholder:text-gray-800"
//                                 value={lastName}
//                                 onChange={e => setLastName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div
//                         className='flex flex-col gap-2'>
//                         <label htmlFor="contact" className="font-semibold text-lg">Enter your phone number</label>
//                         <div className="flex gap-3 justify-center">
//                             <select
//                                 name="country"
//                                 className="w-22 bg-gray-200 rounded-sm text-center"
//                                 value={phoneCode}
//                                 onChange={e => setPhoneCode(e.target.value)} // Use onChange instead of onClick
//                                 required
//                             >
//                                 <option value={phoneCodes['🇮🇳']}>🇮🇳 {phoneCodes['🇮🇳']}</option>
//                                 <option value={phoneCodes['🇬🇧']}>🇬🇧 {phoneCodes['🇬🇧']}</option>
//                                 <option value={phoneCodes['🇺🇸']}>🇺🇸 {phoneCodes['🇺🇸']}</option>
//                                 <option value={phoneCodes['🇦🇺']}>🇦🇺 {phoneCodes['🇦🇺']}</option>
//                             </select>
//                             <input
//                                 type="tel"
//                                 name="tel"
//                                 placeholder="123-456-7890"
//                                 className="bg-gray-200 w-72 rounded-sm p-2 placeholder:text-gray-800"
//                                 value={phoneNumber}
//                                 onChange={e => setPhoneNumber(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div
//                         className='flex flex-col gap-2'>
//                         <label htmlFor="password" className="font-semibold text-lg">Enter your password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter your password"
//                             className="bg-gray-200 rounded-sm p-2 w-full placeholder:text-gray-800"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             required

//                         />
//                     </div>
//                     {/* <button
//                         className='text-left bg-green-700 w-40 p-1 text-white rounded-sm '
//                     >
//                         Generate a username</button>
//                     <div className='p-1 bg-gray-200'>{username}</div> */}
//                     <button
//                         type="submit"
//                         className="bg-black text-white w-full py-2 rounded-sm self-center font-bold"
//                     >
//                         Login
//                     </button>
//                     <Link to='/login' className='text-center text-sm'>
//                         Already have a account ?
//                         <span className='text-blue-500'> login here</span>
//                     </Link>
//                 </form>
//                 <Link
//                     to='/captain-signup'
//                     className='mt-34 bg-green-700 text-white text-xl w-full text-center  py-2 rounded-lg font-bold'
//                 >
//                     Signup as Captain
//                 </Link>
//             </div >
//         </div >
//     );
// };

// export default UserSignup;