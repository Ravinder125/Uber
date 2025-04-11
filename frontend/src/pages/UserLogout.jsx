import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/user.service'

const UserLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {

        const token = localStorage.getItem('user-token');
        if (!token) {
            alert('No token found. Redirecting to login page.');
            return navigate('/login');

        }
        try {
            const response = await logoutUser();
            if (response.status === 200) {
                console.log('User successfully logged out:', response.data);
                localStorage.removeItem('user-token');
                navigate('/login'); // Redirecting to login page after successful logout
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }

    }
    return (
        <div>
            <button onClick={handleLogout} className='absolute right-[50%] bottom-[50%] bg-black text-white rounded-lg text-xl font-semibold py-3 px-5' type="button">Logout</button>
        </div>
    )
}
export default UserLogout;