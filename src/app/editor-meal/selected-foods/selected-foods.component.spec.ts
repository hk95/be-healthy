import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditorMealModule } from '../editor-meal.module';

import { SelectedFoodsComponent } from './selected-foods.component';

describe('SelectedFoodsComponent', () => {
  let component: SelectedFoodsTestComponent;
  let fixture: ComponentFixture<SelectedFoodsTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [EditorMealModule],
        declarations: [SelectedFoodsTestComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFoodsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  template: `<app-selected-foods></app-selected-foods>`,
})
class SelectedFoodsTestComponent {
  editorMealComponent: SelectedFoodsComponent;
}
