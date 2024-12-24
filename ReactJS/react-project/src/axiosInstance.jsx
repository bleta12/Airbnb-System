import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        console.log('Request Config:', config);
        return config;
    },
    (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
    }
);




axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
             
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const { data } = await axios.post('http://localhost:8080/api/auth/refresh', { refreshToken });

                 
                    localStorage.setItem('accessToken', data.accessToken);

                   
                    error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                   
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/LogInSignUp/Login'; 
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
