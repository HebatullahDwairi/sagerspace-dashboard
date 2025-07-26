import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, 
});


api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('access_token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if(error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await api.post('/token/refresh/');
      const newAccessToken = res.data.access;
      localStorage.setItem('access_token', newAccessToken);
    }

    return Promise.reject(error);
  }
);