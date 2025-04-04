import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Local token:', token)
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/auths/is-logged-in`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setUser(response.data);

            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    if (!user) {
        return null;
    }

    return (
        <> {children} </>
    );
};

export default UserProtectWrapper;
