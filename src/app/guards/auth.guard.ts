import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) { }

  canActivate() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      console.log(this.jwtHelperService.decodeToken(token));
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}
