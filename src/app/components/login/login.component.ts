import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  invalidLogin: boolean = true;
  user: User = new User();

  sub1: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  login(user: User) {
    this.sub1 = this.authService.login(user).subscribe((response) => {
      console.log(response);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      this.invalidLogin = false;
      this.router.navigate(['']);
    }, err => {
      console.log(err);
      this.invalidLogin = true;
    });
  }

}
