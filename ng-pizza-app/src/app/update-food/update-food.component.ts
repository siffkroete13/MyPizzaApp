import { Component, OnInit } from '@angular/core';
import { FoodElement } from '../food_element';
import { FoodService } from '../food.service';
import { MessagesService } from '../messages.service';
import { AccordionListComponent } from '../accordion-list/accordion-list.component';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {

  private accordionList: AccordionListComponent;

  constructor(private foodService : FoodService, private messagesService: MessagesService) {}

  ngOnInit() {
    this.loadAll();
  }

  public loadAll() {
    console.log('loadAll()');
    this.foodService.loadAll().subscribe((data) =>  {
      console.log('update-food.component::getAll() succeeded!', data);
      this.messagesService.add('Got Food-Elements!');
      this.accordionList = new AccordionListComponent(this.foodService);
    }, (err) => {
      console.log('update-food.component:getAll(), err: ', err);
      this.messagesService.add('Error message: ' + JSON.stringify(err) );
    });
  }

}
