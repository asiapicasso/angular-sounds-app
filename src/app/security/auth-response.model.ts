import { User } from "../models/users";

export interface AuthResponse {
    token: string;
    user: User;
} 