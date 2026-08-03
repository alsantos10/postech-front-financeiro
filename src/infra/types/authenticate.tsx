export type AuthResponse = {
    success: boolean;
    data: {
        token: string;
    };
};  

export interface AuthRequest {
    email: string;
    password: string;
}
