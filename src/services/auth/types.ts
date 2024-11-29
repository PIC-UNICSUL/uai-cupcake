
interface LoginReq {
    mail: string;
    password: string;
}

interface LoginRes {
    accessToken: string;
    expiresIn: number;
}

