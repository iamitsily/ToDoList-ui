import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../model/user';
import { Config } from '../config';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = Config.apiUrl+'/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { 
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getUser(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.updateUserLocal(response.user);
        })
      );
  }

  // Guarda el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtiene el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  updateUserLocal(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Elimina el token y la información del usuario de localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
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
