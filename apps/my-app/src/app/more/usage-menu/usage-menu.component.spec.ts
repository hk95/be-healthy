import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageMenuComponent } from './usage-menu.component';

describe('UsageMenuComponent', () => {
  let component: UsageMenuComponent;
  let fixture: ComponentFixture<UsageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
