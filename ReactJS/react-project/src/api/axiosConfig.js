import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // kontrollon në localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // dërgon tokenin
    }
    return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
