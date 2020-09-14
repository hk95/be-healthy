import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageMealComponent } from './usage-meal.component';

describe('UsageMealComponent', () => {
  let component: UsageMealComponent;
  let fixture: ComponentFixture<UsageMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageMealComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
