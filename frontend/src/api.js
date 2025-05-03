import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const instance = axios.create({
  baseURL: backendUrl,
});

export default instance;