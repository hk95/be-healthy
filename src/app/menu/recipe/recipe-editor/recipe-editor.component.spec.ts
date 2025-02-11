import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeEditorComponent } from './recipe-editor.component';

describe('RecipeEditorComponent', () => {
  let component: RecipeEditorComponent;
  let fixture: ComponentFixture<RecipeEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecipeEditorComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
