import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: UserDetails;

  constructor(private auth: AuthenticationService, messageService: MessagesService) { }

  ngOnInit() {
    this.auth.profile().subscribe( (data) => {
      if(data.data && !data.err) {
        this.user = data.data;
      } else {
      }
      console.error('Fehler in ProfileComponent.ngOnInit(), this.auth.profile().subscribe( (data) => ... \
      , data.err: ', data.err);
    }, (err) => {
       console.error('Fehler in ProfileComponent.ngOnInit(), subscribe...(err) => ..., err: ', err);
    });
  }
}
