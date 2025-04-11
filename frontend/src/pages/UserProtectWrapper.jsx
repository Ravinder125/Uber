import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../services/auth.service';
import axios from 'axios';
import Loading from '../features/Loading';

const UserProtectWrapper = ({ children }) => {
    const [isLoding, setIsLoding] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const token = localStorage.getItem('user-token');

            if (!token) {
                console.warn('User token not found, redirecting to login page');
                return navigate('/login');
            }
            try {
                // const response = await isUserLoggedIn();
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auths/is-user-logged-in`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                if (response.status === 200) {
                    console.log('User token is valid:', response.data);
                }
            } catch (error) {
                setIsLoding(false);
                console.error('Error validating user token:', error);
                localStorage.removeItem('user-token');
                navigate('/login');
            } finally {
                setIsLoding(false);
            }

        };

        checkUserAuthentication();
    }, [navigate]);

    if (isLoding) {
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

export default UserProtectWrapper;
