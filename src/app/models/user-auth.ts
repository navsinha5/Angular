export interface UserCredentials{
    email: string;
    password: string;
}
  
export interface TokenResponse{
    token: string;
    email: string;
}

export interface User{
    name: string;
    email: string;
}

export interface NewUser{
    name:string;
    email:string;
    password:string;
}
