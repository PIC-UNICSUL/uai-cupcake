type Role = 'CUSTOMER' | 'ADMIN';

interface CreateAccountReq {
  name: string;
  mail: string;
  password: string;
  phone: string;
}

interface CreateAccountRes {
  id: string;
  name: string;
  mail: string;
  phone: string;
  role: Role;
}

interface User {
  id: string;
  name: string;
  mail: string;
  phone: string;
  role: Role;
}
