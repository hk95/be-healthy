import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListForMealComponent } from './food-list-for-meal.component';

describe('FoodListForMealComponent', () => {
  let component: FoodListForMealComponent;
  let fixture: ComponentFixture<FoodListForMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodListForMealComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListForMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
