import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/user';
import { Config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  private apiUrl = Config.apiUrl;

  constructor(private http: HttpClient) { }

}
