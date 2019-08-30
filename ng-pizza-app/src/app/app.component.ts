import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public constructor(private titleService: Title ) {}

  title : String;

  ngOnInit() {
    this.titleService.setTitle('Pizza und Döner. Mampf!');
    this.title = this.titleService.getTitle();
  }

}