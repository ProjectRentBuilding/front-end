import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // ,'Access-Control-Allow-Origin': 'http://localhost:4200'
};
@Injectable({
  providedIn: 'root'
})

export class AuthJwtService {
  loginUrl="http://localhost:8080/login";

  constructor(private http: HttpClient) { }

  attemptAuth(userInfo: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userInfo, httpOptions);
  }


}
