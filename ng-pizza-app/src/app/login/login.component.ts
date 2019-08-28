import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    _id: 0,
    username: '',
    email: '',
    exp:  0
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    console.log('login in login.components.ts');
    this.auth.login(this.credentials).subscribe((data) => {
      console.log('Inside this.auth.login(), data: ', data);
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log('Inside this.auth.login(), Fehler: ', err);
    });
  }
}