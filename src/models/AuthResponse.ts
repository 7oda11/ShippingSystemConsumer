export interface AuthResponse {
  token: string;
  expiration: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string[];
}
