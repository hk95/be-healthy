import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealResultListComponent } from './meal-result-list.component';

describe('MealResultListComponent', () => {
  let component: MealResultListComponent;
  let fixture: ComponentFixture<MealResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealResultListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
