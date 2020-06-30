import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrateFarmerComponent } from './registrate-farmer.component';

describe('RegistrateFarmerComponent', () => {
  let component: RegistrateFarmerComponent;
  let fixture: ComponentFixture<RegistrateFarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrateFarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrateFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
