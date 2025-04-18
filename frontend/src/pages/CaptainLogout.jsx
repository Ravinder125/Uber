import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutCaptain } from '../services/captain.service';
import Loading from '../features/Loading';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('captain-token');
        if (!token) {
            console.warn('No token found, redirecting to login');

            // Redirecting to captain login page if no token is found
            navigate('/captain-login');
        }
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
                console.error('Error logging out:', error);
                const errorMessage = error.response?.data?.message || "An error occurred";
                console.warn('Error:', errorMessage)
                localStorage.removeItem('captain-token');
                // Redirecting to captain login page if an error occurs
                navigate('/captain-login');
            }
        };
        handleLogout();
    }, [navigate]);

    return (
        <Loading />
    );
};

export default CaptainLogout;