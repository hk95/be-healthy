import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTopComponent } from './usage-top.component';

describe('UsageTopComponent', () => {
  let component: UsageTopComponent;
  let fixture: ComponentFixture<UsageTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageTopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
