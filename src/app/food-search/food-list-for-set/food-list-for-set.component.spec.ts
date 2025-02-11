import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListForSetComponent } from './food-list-for-set.component';

describe('FoodListForSetComponent', () => {
  let component: FoodListForSetComponent;
  let fixture: ComponentFixture<FoodListForSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodListForSetComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListForSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
