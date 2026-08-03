import { AuthUser, User } from "@/core/entities/User";

export interface ApiUsers {
    users: AuthUser[]
}

export interface ApiAuthUser {
    user: AuthUser
}

export interface ApiUsersResponse {
  success: boolean;
  data: ApiUsers;
  total: number;
} 

export interface ApiUserResponse {
  success: boolean;
  data: ApiAuthUser;
} 

export interface AuthRequest {
    email: string;
    password: string;
}

export interface UsersRequest {
    data: User[],
    total: number
}