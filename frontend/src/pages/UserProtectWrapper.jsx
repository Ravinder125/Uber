import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);

    return (
        <> {children} </>
    );
};

export default UserProtectWrapper;
