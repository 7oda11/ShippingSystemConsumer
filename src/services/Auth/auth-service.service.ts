import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../models/AuthResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = "https://localhost:7109/api/Auth/login";
  constructor(private http: HttpClient) { }

  login(Username: string, Password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}`, { Username, Password });
  }
}
