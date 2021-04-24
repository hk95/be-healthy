import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DailyDetailComponent } from './daily-detail.component';

describe('DailyDetailComponent', () => {
  let component: DailyDetailComponent;
  let fixture: ComponentFixture<DailyDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DailyDetailComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
