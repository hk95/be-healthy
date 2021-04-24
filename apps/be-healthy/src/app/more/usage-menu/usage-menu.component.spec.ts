import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsageMenuComponent } from './usage-menu.component';

describe('UsageMenuComponent', () => {
  let component: UsageMenuComponent;
  let fixture: ComponentFixture<UsageMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsageMenuComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
