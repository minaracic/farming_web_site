import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticlComponent } from './new-articl.component';

describe('NewArticlComponent', () => {
  let component: NewArticlComponent;
  let fixture: ComponentFixture<NewArticlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
