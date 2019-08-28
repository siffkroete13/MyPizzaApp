import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    _id: 0,
    username: '',
    email: '',
    exp:  0
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe((data) => {
      console.log('Inside this.auth.register(), data: ', data);
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log('Inside this.auth.register(), Fehler: ', err);
    });
  }
}