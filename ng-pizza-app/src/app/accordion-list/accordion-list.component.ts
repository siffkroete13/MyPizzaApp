import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-accordion-list',
  templateUrl: './accordion-list.component.html',
  styleUrls: ['./accordion-list.component.css']
})
export class AccordionListComponent implements OnInit {

  @ViewChild('entire_accordion', {static: false}) ref_entire_accordion: MatAccordion;

  private title: string;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
  }

  updateList(i: number, property: string, item: any, event: any) {
    console.log('index:', i, 'property: ' , property, 'item: ', item, 'event: ', event);
    const contentOfditField = event.target.textContent;
    item[property] = contentOfditField;
    console.log('item after update: ', item);
    this.foodService.setFoodElement(i, item);
  }

}
