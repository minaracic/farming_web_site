import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenOrdersComponent } from './garden-orders.component';

describe('GardenOrdersComponent', () => {
  let component: GardenOrdersComponent;
  let fixture: ComponentFixture<GardenOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
