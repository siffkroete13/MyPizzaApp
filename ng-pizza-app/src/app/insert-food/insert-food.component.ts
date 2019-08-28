import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { FoodElement } from '../food_element';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-insert-food',
  templateUrl: './insert-food.component.html',
  styleUrls: ['./insert-food.component.css']
})
export class InsertFoodComponent implements OnInit {
  
  private foodElement : FoodElement;

  constructor(private foodService : FoodService, private messagesService: MessagesService) {
    this.foodElement = new FoodElement();
  }

  ngOnInit() {}

  public insert() {
    console.log('inside insert-food.component::insert(): this.foodElement: ', this.foodElement);
    this.foodService.insert(this.foodElement).subscribe( (data) => {
      console.log('insert-food.component::insert(): callback-success: data: ', data);
      this.messagesService.add('Added meal to the menu!')
    }, (err) => {
      console.log('Error on adding meal to menu!: ', err);
      this.messagesService.add('Error on adding meal to menu! Error message: ' + err);
    });
  }
}
