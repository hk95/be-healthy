import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorMealComponent } from './editor-meal.component';

describe('EditorMealComponent', () => {
  let component: EditorMealComponent;
  let fixture: ComponentFixture<EditorMealComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditorMealComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
