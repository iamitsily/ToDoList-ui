import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

}
