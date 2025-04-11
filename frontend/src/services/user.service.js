import axios from "axios";


const API_URL = `${import.meta.env.VITE_BASE_URL}/users`;
const token = localStorage.getItem('user-token');

export const registerUser = async (registerData) => {
    const response = await axios.post(`${API_URL}/register`, registerData);
    return response;
}

export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response;
}

export const logoutUser = async () => {
    const response = await axios.get(`${API_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}