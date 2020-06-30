import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensOverviewComponent } from './gardens-overview.component';

describe('GardensOverviewComponent', () => {
  let component: GardensOverviewComponent;
  let fixture: ComponentFixture<GardensOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardensOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardensOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
