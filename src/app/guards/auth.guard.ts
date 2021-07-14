import { User } from './../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  sub1: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    // Token'ı yenile
    let accessToken: string = localStorage.getItem("accessToken");
    let refreshToken: string = localStorage.getItem("refreshToken");
    let result: boolean = false;
    let user: User = { userName: "", password: "", accessToken: accessToken, refreshToken: refreshToken };
    if (accessToken && refreshToken) {
      this.sub1 = this.authService.refresh(user).subscribe((response) => {
        console.log("Tokenlar yenilendi !!!!!!!!!!!!!!!!!!!!!!!!!!!");
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        result = true;
      }, err => {
        console.log(err);
        this.router.navigate(["login"]);
        result = false;
      });
    }
    console.log(result);
    return result;
  }
}
