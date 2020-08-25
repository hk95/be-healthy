import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWeightComponent } from './editor-weight.component';

describe('EditorWeightComponent', () => {
  let component: EditorWeightComponent;
  let fixture: ComponentFixture<EditorWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorWeightComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
