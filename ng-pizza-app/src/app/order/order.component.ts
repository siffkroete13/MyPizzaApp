import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderElement } from '../orderElement';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() orders : OrderElement[];

  constructor(private orderService : OrderService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders()
        .subscribe(orders => this.orders = orders);
  }

}
