import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-list-bootstrap',
  templateUrl: './accordion-list-bootstrap.component.html',
  styleUrls: ['./accordion-list-bootstrap.component.css']
})
export class AccordionListBootstrapComponent implements OnInit {

  @Input()
  public items: any[];

  constructor() { }

  ngOnInit() {
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  public selectProduct(event)  {
    // event.stopPropagation();
  }

  public onMouseDownCheckBox(e: any, i: any){
    this.items[i].checked = !this.items[i].checked;

    e.stopPropagation();
}

}
