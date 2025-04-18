import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isCaptainLoggedIn } from '../services/auth.service';
import Loading from '../features/Loading';




const CaptainProtectWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('captain-token');

    useEffect(() => {
        const checkCaptainAuthentication = async () => {
            if (!token) {
                console.warn('Captain token not found, redirecting to login page');
                navigate('/captain-login');
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auths/is-captain-logged-in`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    console.log('Captain token is valid:', response.data);
                }
            } catch (error) {
                console.error('Error validating captain token:', error);
                const errorMessage = error.response?.data?.message || "An error occurred";
                localStorage.removeItem('captain-token');

                // Redirecting to captain login page if an error occurs
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };

        checkCaptainAuthentication();
    }, [navigate, token]);

    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    }
    return (
        <>
            {children}
        </>
    )
};

export default CaptainProtectWrapper;
