import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetDetailComponent } from './set-detail.component';

describe('SetDetailComponent', () => {
  let component: SetDetailComponent;
  let fixture: ComponentFixture<SetDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SetDetailComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
