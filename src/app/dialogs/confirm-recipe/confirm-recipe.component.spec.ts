import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmRecipeComponent } from './confirm-recipe.component';

describe('ConfirmRecipeComponent', () => {
  let component: ConfirmRecipeComponent;
  let fixture: ComponentFixture<ConfirmRecipeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmRecipeComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
