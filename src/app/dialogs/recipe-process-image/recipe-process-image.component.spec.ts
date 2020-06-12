import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeProcessImageComponent } from './recipe-process-image.component';

describe('RecipeProcessImageComponent', () => {
  let component: RecipeProcessImageComponent;
  let fixture: ComponentFixture<RecipeProcessImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeProcessImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeProcessImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
