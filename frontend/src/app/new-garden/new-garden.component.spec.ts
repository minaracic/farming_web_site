import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGardenComponent } from './new-garden.component';

describe('NewGardenComponent', () => {
  let component: NewGardenComponent;
  let fixture: ComponentFixture<NewGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
