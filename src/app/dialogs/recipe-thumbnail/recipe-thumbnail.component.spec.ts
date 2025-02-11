import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeThumbnailComponent } from './recipe-thumbnail.component';

describe('RecipeThumbnailComponent', () => {
  let component: RecipeThumbnailComponent;
  let fixture: ComponentFixture<RecipeThumbnailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecipeThumbnailComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
