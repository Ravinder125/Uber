import axios from "axios";


const API_URL = `${import.meta.env.VITE_BASE_URL}/auths`;
const token = localStorage.getItem('captain-token');

export const isCaptainLoggedIn = async () => {
    console.log('token at auth service:', token);
    return await axios.get(`${API_URL}/is-captain-logged-in`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const isUserLoggedIn = async () => {
    console.log('token:', token);
    const response = await axios.get(`${API_URL}/is-captain-logged-in`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}