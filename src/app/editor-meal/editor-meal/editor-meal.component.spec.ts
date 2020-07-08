import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMealComponent } from './editor-meal.component';

describe('EditorMealComponent', () => {
  let component: EditorMealComponent;
  let fixture: ComponentFixture<EditorMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorMealComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
