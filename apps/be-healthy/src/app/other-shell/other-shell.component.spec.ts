import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherShellComponent } from './other-shell.component';

describe('OtherShellComponent', () => {
  let component: OtherShellComponent;
  let fixture: ComponentFixture<OtherShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherShellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
