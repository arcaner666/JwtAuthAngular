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

  token: string;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  isUserAuthenticated() {
    this.token = localStorage.getItem("jwt")!;
    if (this.token && !this.jwtHelperService.isTokenExpired(this.token)) {
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
