import axios from 'axios';
import { AuthService} from '@/services/auth';


const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
	baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
		config.headers = config.headers ?? {};

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
