import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsageGraphComponent } from './usage-graph.component';

describe('UsageGraphComponent', () => {
  let component: UsageGraphComponent;
  let fixture: ComponentFixture<UsageGraphComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsageGraphComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
