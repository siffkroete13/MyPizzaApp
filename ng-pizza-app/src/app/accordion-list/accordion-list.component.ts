import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-accordion-list',
  templateUrl: './accordion-list.component.html',
  styleUrls: ['./accordion-list.component.css']
})
export class AccordionListComponent implements AfterViewInit {
  @ViewChild( "expandWrapper", { read: ElementRef, static: false } ) expandWrapper: ElementRef;

  @Input()
  public items: any[];

  @Input()
  public expandHeight: string;

  public status: boolean[] = [true, true, true, true, true, true, true, true, true,  true,
    true, true, true, true, true];

  constructor(public renderer: Renderer2) { }

  // ngOnInit() {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
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

  public toggle(i) {
    this.status[i] = !this.status[i];
  }


}
