import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const UserProtectWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // const fetchUser = async () => {
    //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/is-logged-in`, { withCredentials: true });
    //     setUser(response);
    //     console.log('user:', response);
    // }
    // fetchUser();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/is-logged-in`, { withCredentials: true });
                setUser(response.data);
                console.log('user:', response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                navigate('/login');
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user === null) return;
        if (user) {
            return (
                <>
                    {children}
                </>
            );
        }
        return null;
        //             {children}
        //         </>
        //     )
        // } else {
        //     navigate('/login');
        // }

    }
    )
}
export default UserProtectWrapper;