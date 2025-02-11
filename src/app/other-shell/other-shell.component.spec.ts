import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OtherShellComponent } from './other-shell.component';

describe('OtherShellComponent', () => {
  let component: OtherShellComponent;
  let fixture: ComponentFixture<OtherShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OtherShellComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
