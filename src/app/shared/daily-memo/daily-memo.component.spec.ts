import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMemoComponent } from './daily-memo.component';

describe('DailyMemoComponent', () => {
  let component: DailyMemoComponent;
  let fixture: ComponentFixture<DailyMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyMemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
