import { Component, OnInit } from '@angular/core';
import { FoodElement } from '../food_element';
import { FoodService } from '../food.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {

  public foodElements: FoodElement[] = [];

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
