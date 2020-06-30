import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedProgressComponent } from './seed-progress.component';

describe('SeedProgressComponent', () => {
  let component: SeedProgressComponent;
  let fixture: ComponentFixture<SeedProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
