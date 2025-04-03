import React from 'react'

const Home = () => {
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/is-logged-in`, { withCredentials: true });
            setUser(response.data);
            if (user) {
                navigate('/home');
                console.log('user:', response);
            } else {
                navigate('/login');
                console.log('user:', response);
            }
        };
        fetchUser();
    }, []);
    return (
        <div>Home</div>
    )
}

export default Home