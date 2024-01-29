/* model representing a request to the authentication resource - auth-request */

export interface AuthRequest {
    firstname: string,
    lastname: string,
    email: string;
    password: string;
} 