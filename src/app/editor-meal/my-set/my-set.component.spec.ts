import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySetComponent } from './my-set.component';

describe('MySetComponent', () => {
  let component: MySetComponent;
  let fixture: ComponentFixture<MySetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MySetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
