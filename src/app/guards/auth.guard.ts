import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    if (this.authService.isRefreshSuccess()) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }
}
