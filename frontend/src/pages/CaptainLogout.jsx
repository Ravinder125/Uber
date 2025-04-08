import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/captain-login');
        }

    }, [navigate, token])

    const handleLogout = () => {
        console.log('Captain Token at logout:', token)


        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Captain successfully logged out:', response.data);
                    localStorage.removeItem('captain-token');
                    navigate('/captain-login');
                }
            })
            .catch(error => {
                console.log('Error logging out:', error);
            })
    }
    return (
        <div>
            <button onClick={handleLogout} className='absolute right-[50%] bottom-[50%] bg-black text-white rounded-lg text-xl font-semibold py-3 px-5' type="button">Logout</button>
        </div>
    )
}

export default CaptainLogout   