import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/user.service'
import Loading from '../features/Loading'

const UserLogout = () => {
    const navigate = useNavigate();


    useEffect(() => {
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
                console.log('Error logging out:', error);
                localStorage.removeItem('user-token');

                const errorMessage = error.response?.data?.message || 'An error occurred during logout'
                console.warn(errorMessage)
                // Redirecting to login page if an error occurs
                navigate('/login')
            }
        }
        handleLogout()
    }, [])
    return (
        <Loading />
    )
}
export default UserLogout;