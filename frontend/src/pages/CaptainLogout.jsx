import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutCaptain } from '../services/captain.service';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('captain-token');
        if (!token) {
            console.log('No token found, redirecting to login');

            // Redirecting to captain login page if no token is found
            navigate('/captain-login');
        }
    }, [navigate]);

    const handleLogout = async () => {
        const token = localStorage.getItem('captain-token');
        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/captain-login');
            return;
        }
        try {
            const response = await logoutCaptain();
            if (response.status === 200) {
                console.log('Captain successfully logged out:', response.data);
                localStorage.removeItem('captain-token');

                // Redirecting to captain login page afte successfull logout
                navigate('/captain-login');
            }
        } catch (error) {
            console.log('Error logging out:', error);
            const errorMessage = error.response?.data?.message || "An error occurred";
            alert(errorMessage);
            localStorage.removeItem('captain-token');

            // Redirecting to captain login page if an error occurs
            navigate('/captain-login');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleLogout}
                className="bg-black text-white rounded-lg text-xl font-semibold py-3 px-5"
                type="button"
            >
                Logout
            </button>
        </div>
    );
};

export default CaptainLogout;