import api from '../api';

const RESOURSE = '/user';

const UserService = {
  createAccount: async (payload: CreateAccountReq): Promise<User> => {
    const response = await api.post(RESOURSE, payload);
    return response.data;
  },
  getUser: async (): Promise<User> => {
    const response = await api.get(RESOURSE);
    return response.data;
  },
};

export { UserService };
