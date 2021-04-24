import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MySetComponent } from './my-set.component';

describe('MySetComponent', () => {
  let component: MySetComponent;
  let fixture: ComponentFixture<MySetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MySetComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
