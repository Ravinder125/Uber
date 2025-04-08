import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('user-token');
            if (!token) {
                alert('No token found. Redirecting to login page.');
                return navigate('/login');

            }

            await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('User successfully logged out:', response.data);
                        localStorage.removeItem('user-token');
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.log('Error logging out:', error);
                })
                
            localStorage.removeItem('user-token');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={handleLogout} className='absolute right-[50%] bottom-[50%] bg-black text-white rounded-lg text-xl font-semibold py-3 px-5' type="button">Logout</button>
        </div>
    )
}
export default UserLogout;