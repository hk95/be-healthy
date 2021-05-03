import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSearchFormComponent } from './food-search-form.component';

describe('FoodSearchFormComponent', () => {
  let component: FoodSearchFormComponent;
  let fixture: ComponentFixture<FoodSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodSearchFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
