import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly apiUrl = "https://localhost:44311/api/";

  accessToken: string;
  refreshToken: string;
  user: User = new User();

  sub1: Subscription;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  isUserAuthenticated() {
    this.accessToken = localStorage.getItem("accessToken")!;
    if (this.accessToken && !this.jwtHelperService.isTokenExpired(this.accessToken)) {
      console.log(this.jwtHelperService.decodeToken(this.accessToken));
      return true;
    } else {
      return false;
    }
  }

  isRefreshSuccess() {
    this.accessToken = localStorage.getItem("accessToken")!;
    this.refreshToken = localStorage.getItem("refreshToken")!;
    let result: boolean = false;
    if (this.accessToken && this.refreshToken && this.jwtHelperService.isTokenExpired(this.accessToken)) {
      this.user.accessToken = this.accessToken;
      this.user.refreshToken = this.refreshToken;
      this.sub1 = this.refresh(this.user).subscribe((response) => {
        console.log(response);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        result = true;
      }, err => {
        console.log(err);
        result = false;
      });
    }
    return result;
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "auth/login", user);
  }

  refresh(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + "token/refresh", user);
  }
}
