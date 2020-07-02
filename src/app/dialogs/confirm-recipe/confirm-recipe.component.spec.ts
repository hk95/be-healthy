import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRecipeComponent } from './confirm-recipe.component';

describe('ConfirmRecipeComponent', () => {
  let component: ConfirmRecipeComponent;
  let fixture: ComponentFixture<ConfirmRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRecipeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
