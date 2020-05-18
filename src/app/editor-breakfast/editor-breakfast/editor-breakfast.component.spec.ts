import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBreakfastComponent } from './editor-breakfast.component';

describe('EditorBreakfastComponent', () => {
  let component: EditorBreakfastComponent;
  let fixture: ComponentFixture<EditorBreakfastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorBreakfastComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBreakfastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
