import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Config } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  private apiUrl = Config.apiUrl+'/api/users';

  constructor(private http: HttpClient, private authService:AuthService) { }

  private getHeaders() {
    const token = this.authService.getToken();
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    });
}

  register(email: string, password: string, name: string, active: 1):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`, { email, password, name, active });
  }
  update(id: number, email: string, password: string, name: string, active: 1):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/update`, { id, email, password, name, active  }, { headers: this.getHeaders() });
  }

}
