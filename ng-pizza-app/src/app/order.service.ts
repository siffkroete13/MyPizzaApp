import { Injectable } from '@angular/core';
import { OrderElement } from './orderElement';
import { OrderElements } from './mock-order-elements';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() {}

  getAllOrders() : Observable<OrderElement[]> {
    return of(OrderElements);
  }
}


