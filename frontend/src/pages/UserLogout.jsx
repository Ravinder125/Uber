import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();
    const handelLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token)
            if (!token) {
                throw new Error('No token found in the local storage');
            }
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('User successfully logged out:', response.data);
            localStorage.removeItem('token');

            // Redirect to login page after successfull logout
            navigate('/login')

        } catch (error) {
            console.log('Error:', error)
        }
    }

    return (
        <div>
            <button onClick={handelLogout} className='absolute right-[50%] bottom-[50%] bg-black text-white rounded-lg text-xl font-semibold py-3 px-5' type="button">Logout</button>
        </div>
    )
}

export default UserLogout