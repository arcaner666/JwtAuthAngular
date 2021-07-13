import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  invalidLogin: boolean = true;
  user: User = { UserName: "", Password: "", Token: "" };

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
    console.log(user);
    this.sub1 = this.authService.login(user).subscribe((response) => {
      localStorage.setItem("jwt", response.Token);
      this.invalidLogin = false;
      this.router.navigate(['']);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
