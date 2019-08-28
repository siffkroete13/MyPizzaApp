import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';
import { HomeComponent } from './home/home.component';
import { PizzaComponent } from './pizza/pizza.component';
import { DoenerComponent } from './doener/doener.component';
import { LoginComponent } from './login/login.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RegisterComponent } from './register/register.component';
import { InsertFoodComponent } from './insert-food/insert-food.component';
import { UpdateFoodComponent } from './update-food/update-food.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent,
    children: [
      { path: 'pizza', component: PizzaComponent },
      { path: 'doener', component: DoenerComponent }
    ] 
  },
  { path: 'cart', component: CartComponent },
  { path: 'pay', component: PayComponent },
  { path: 'insert', component: InsertFoodComponent },
  { path: 'update', component: UpdateFoodComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
