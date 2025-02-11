import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WelcomeShellComponent } from './welcome-shell.component';

describe('WelcomeShellComponent', () => {
  let component: WelcomeShellComponent;
  let fixture: ComponentFixture<WelcomeShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WelcomeShellComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
