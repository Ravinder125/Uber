import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/auth.service";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const token = localStorage.getItem("user-token");

            if (!token) {
                console.warn("User token not found, redirecting to login page");
                return navigate("/login");
            }

            try {
                const response = await isUserLoggedIn();
                if (response.status === 200) {
                    console.log("User token is valid:", response.data);
                }
            } catch (error) {
                console.error("Error validating user token:", error);
                const errorMessage = error.response?.data?.message || "An error occurred";
                alert(errorMessage);
                localStorage.removeItem("user-token");
                navigate("/login");
            }
        };

        checkUserAuthentication();
    }, [navigate]);

    return <>{children}</>;
};

export default UserProtectWrapper;
