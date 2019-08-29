import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionListBootstrapComponent } from './accordion-list-bootstrap.component';

describe('AccordionListBootstrapComponent', () => {
  let component: AccordionListBootstrapComponent;
  let fixture: ComponentFixture<AccordionListBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionListBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionListBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
