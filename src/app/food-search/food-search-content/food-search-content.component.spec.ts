import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSearchContentComponent } from './food-search-content.component';

describe('FoodSearchContentComponent', () => {
  let component: FoodSearchContentComponent;
  let fixture: ComponentFixture<FoodSearchContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodSearchContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSearchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
