import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoenerComponent } from './doener.component';

describe('DoenerComponent', () => {
  let component: DoenerComponent;
  let fixture: ComponentFixture<DoenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
