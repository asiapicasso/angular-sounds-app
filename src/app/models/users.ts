export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;

}


export interface UserResponse {
    message: string;
    user: User;
}