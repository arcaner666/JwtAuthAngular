import { User } from './../models/user';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate() {
    if (this.authService.isUserAuthenticated()) {
      console.log("AccessToken geçerli.");
      return true;
    }

    let isRefreshSuccess: boolean = await this.tryRefreshingTokens();
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }

    return isRefreshSuccess;
  }

  async tryRefreshingTokens(): Promise<boolean> {
    let user: User = new User();
    user.accessToken = localStorage.getItem("accessToken");
    user.refreshToken = localStorage.getItem("refreshToken");
    if (!user.accessToken || !user.refreshToken) {
      return false;
    }
    let isRefreshSuccess: boolean;
    try {
      let response = await this.authService.refresh(user).toPromise();
      console.log(response);
      let newAccessToken = (<any>response).accessToken;
      let newRefreshToken = (<any>response).refreshToken;
      console.log("Tokenlar yenilendi.");
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    } catch (error) {
      console.log("Tokenlar yenilenemedi!");
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
