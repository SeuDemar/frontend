import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para adicionar o token JWT no header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // pega token do localStorage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
