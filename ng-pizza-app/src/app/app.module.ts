import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';
import { HomeComponent } from './home/home.component';
import { PizzaComponent } from './pizza/pizza.component';
import { DoenerComponent } from './doener/doener.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { InsertFoodComponent } from './insert-food/insert-food.component';
import { MatExpansionModule, MatInputModule, MatButtonModule } from '@angular/material';
import { UpdateFoodComponent } from './update-food/update-food.component';
import { MessagesComponent } from './messages/messages.component';
import { AccordionListComponent } from './accordion-list/accordion-list.component';
import { AccordionListBootstrapComponent } from './accordion-list-bootstrap/accordion-list-bootstrap.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    CartComponent,
    PayComponent,
    HomeComponent,
    PizzaComponent,
    DoenerComponent,
    RegisterComponent,
    LoginComponent,
    InsertFoodComponent,
    UpdateFoodComponent,
    MessagesComponent,
    AccordionListComponent,
    AccordionListBootstrapComponent,
    HeaderComponent,
    FooterComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule, 
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
