import axios from "axios";


const API_URL = `${import.meta.env.VITE_BASE_URL}/captains`;

export const loginCaptain = async (loginData) => {
    const response = await axios.post(`${API_URL}/login`, loginData);
    if (response.status === 200) {
        return response.data.data;
    }
    return response
}

export const registerCaptain = async (captainData) => {
    const response = await axios.post(`${API_URL}/register`, captainData);
    if (response.status === 201) {
        return response.data.data;
    }
    return response
}