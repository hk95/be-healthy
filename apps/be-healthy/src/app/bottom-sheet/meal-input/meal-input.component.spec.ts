import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealInputComponent } from './meal-input.component';

describe('MealInputComponent', () => {
  let component: MealInputComponent;
  let fixture: ComponentFixture<MealInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MealInputComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MealInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
