import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly apiUrl = "https://localhost:44311/api/auth/";

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  isUserAuthenticated() {
    const token: string = JSON.stringify(localStorage.getItem("jwt"));
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "login", user);
  }
}
