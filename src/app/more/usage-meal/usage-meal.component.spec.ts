import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsageMealComponent } from './usage-meal.component';

describe('UsageMealComponent', () => {
  let component: UsageMealComponent;
  let fixture: ComponentFixture<UsageMealComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsageMealComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
