import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrateEnterpriseComponent } from './registrate-enterprise.component';

describe('RegistrateEnterpriseComponent', () => {
  let component: RegistrateEnterpriseComponent;
  let fixture: ComponentFixture<RegistrateEnterpriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrateEnterpriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrateEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
