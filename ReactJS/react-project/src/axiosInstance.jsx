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
                }catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    
                  
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    
                    
                    const messageDiv = document.createElement('div');
                    messageDiv.innerText = 'Your session has expired. You will be redirected to the login page in a few seconds...';
                    messageDiv.style.position = 'fixed';
                    messageDiv.style.top = '50%';
                    messageDiv.style.left = '50%';
                    messageDiv.style.transform = 'translate(-50%, -50%)';
                    messageDiv.style.backgroundColor = 'white';
                    messageDiv.style.padding = '20px';
                    messageDiv.style.border = '1px solid #ccc';
                    messageDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                    document.body.appendChild(messageDiv);
                
                  
                    setTimeout(() => {
                        window.location.href = '/LogInSignUp/Login';
                    }, 3000);
                }
                
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
