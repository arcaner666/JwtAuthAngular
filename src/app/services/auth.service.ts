import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly apiUrl = "https://localhost:44311/api/";

  user: User = new User();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  isUserAuthenticated() {
    let accessToken = localStorage.getItem("accessToken")!;
    if (accessToken && !this.jwtHelperService.isTokenExpired(accessToken)) {
      //console.log(this.jwtHelperService.decodeToken(accessToken));
      return true;
    } else {
      return false;
    }
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "auth/login", user);
  }

  refresh(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "token/refresh", user);
  }
}
