export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    active: number;
    user_roles: UserRole[];
  }
  
  export interface UserRole {
    id: number;
    name: string;
    active: number;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }

  
  