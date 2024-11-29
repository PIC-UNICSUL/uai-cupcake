import { jwtParse } from '@/utils/jwt-parse';
import api from '../api';

const UAI_TOKEN =   'UAI_TOKEN';

const AuthService = {
  setToken (token: string) {
    localStorage.setItem(UAI_TOKEN, token);
  },
  getToken () {
    return localStorage.getItem(UAI_TOKEN);
  },
  decodeToken() {
    const token = AuthService.getToken();
    if (!token) return null;

    try {
      return jwtParse(token); 
    } catch {
      return null; 
    }
  },
  isAuthenticated() {
    const decoded = AuthService.decodeToken();
    if (!decoded) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime; 
  },
  getUserRole() {
    const decoded = AuthService.decodeToken();
    return decoded?.scope ?? null; 
  },
  login: async (payload: LoginReq): Promise<LoginRes> => {
    const response = await api.post('/login', payload);
    AuthService.setToken(response.data.accessToken);

    return response.data;
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem(UAI_TOKEN);
  },
 
};


export { AuthService };