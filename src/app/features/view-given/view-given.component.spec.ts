import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGivenComponent } from './view-given.component';

describe('ViewGivenComponent', () => {
  let component: ViewGivenComponent;
  let fixture: ComponentFixture<ViewGivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
