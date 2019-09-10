import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderElement } from '../orderElement';
import { FoodElement } from '../food_element';
import { FoodService } from '../food.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public foodElements: FoodElement[] = [];

  public expandHeight: string = "150px";

  constructor(private foodService: FoodService, private messagesService: MessagesService) {
    this.loadAll();
  }

  ngOnInit() {}

  public loadAll() {
    console.log('loadAll()');
    this.foodService.loadAll().subscribe((data) =>  {
      console.log('update-food.component::getAll() succeeded!', data);
      this.messagesService.add('Got Food-Elements!');
      this.foodElements = data;
    }, (err) => {
      console.log('update-food.component:getAll(), err: ', err);
      this.messagesService.add('Error message: ' + JSON.stringify(err) );
    });
  }

  public getItems() {
    let items = [];
    for(let i in this.foodElements) {
      let key = Object.keys(this.foodElements[i]);
      [ key[0], key[1], key[2] ] = [ key[3], key[4], key[5] ];
      let value = Object.values(this.foodElements[i]);
      [ value[0], value[1], value[2] ] = [ value[3], value[4], value[5] ];
      items.push( {'key': key, 'value': value, 'checked': true} );
    }
    console.log('items: ' , items);
    return items;
  }

}
