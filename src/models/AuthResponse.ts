export interface AuthResponse {
  token: string;
  expiration: string;
  user: User;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  roles: string[];
}
