import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth : AuthenticationService) { }

  ngOnInit() {
  }

  public getPersonalGreeting() {
    return ('Hi ' + this.auth.getUserDetails().username + '. Order here! ' + String.fromCodePoint(0x1F61B) );
  }

  public getImpersonalGreeting() {
    return ('Order Pizza and Döner! '); // +  String.fromCodePoint(0x1F61B));
  }
}
