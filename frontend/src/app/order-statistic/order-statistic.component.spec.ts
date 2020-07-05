import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticComponent } from './order-statistic.component';

describe('OrderStatisticComponent', () => {
  let component: OrderStatisticComponent;
  let fixture: ComponentFixture<OrderStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
