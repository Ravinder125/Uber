import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { isCaptainLoggedIn } from '../services/auth.service';



const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = React.useMemo(() => localStorage.getItem('captain-token'), []);

    React.useEffect(() => {
        const checkCaptainAuthentication = async () => {
            if (!token) {
                console.warn('Captain token not found, redirecting to login page');
                return navigate('/captain-login');
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
                alert(errorMessage);
                localStorage.removeItem('captain-token');

                // Redirecting to captain login page if an error occurs
                navigate('/captain-login');
            }
        };

        checkCaptainAuthentication();
    }, [navigate, token]);

    return <>{children}</>;
};

export default CaptainProtectWrapper;
