import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  private apiUrl = Config.apiUrl+'/api/users';

  constructor(private http: HttpClient) { }

  register(email: string, password: string, name: string, active: 1):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`, { email, password, name, active });
  }

}
