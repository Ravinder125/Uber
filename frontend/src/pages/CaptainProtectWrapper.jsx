import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('captain-token');

    useEffect(() => {
        if (!token) navigate('/captain-login');

        axios.get(`${import.meta.env.VITE_BASE_URL}/auths/is-captain-logged-in`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Captain token is valid:', response.data);
                }
            })
            .catch(error => {
                console.log('Error validating captain token:', error);
                localStorage.removeItem('captain-token');
                navigate('/captain-login');
            })
    }, [navigate, token]);

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper