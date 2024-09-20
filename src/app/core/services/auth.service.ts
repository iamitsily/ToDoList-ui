import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config, Observable } from 'rxjs';
import { AuthResponse } from '../model/user';
import { Config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = Config.apiUrl+'/auth';


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  // Guarda el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtiene el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Guarda la información del usuario en localStorage
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtiene la información del usuario de localStorage
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Elimina el token y la información del usuario de localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Obtiene los roles del usuario
  getUserRoles(): string[] {
    const user = this.getUser();
    return user.user_roles?.map((role: any) => role.name) || [];
  }
}
