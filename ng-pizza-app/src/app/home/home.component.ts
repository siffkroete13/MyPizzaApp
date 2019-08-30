import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { AuthenticationService } from '../authentication.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth : AuthenticationService, private foodService : FoodService) {}

  ngOnInit() {
  }
}
