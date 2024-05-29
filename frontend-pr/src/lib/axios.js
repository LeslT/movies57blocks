import axios from 'axios';

const apiBaseUrl = process.env.VITE_API_URL || importMetaEnv.VITE_API_URL;

const api = axios.create({
    baseURL: apiBaseUrl
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;